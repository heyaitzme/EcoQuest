const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const _ = cloud.database().command

exports.main = async (event, context) => {
  try {
    const { availableQuestions } = event
    const MIN_PER_LEVEL = 4

    // 1. Organize questions by difficulty
    const difficultyMap = {
      1: { name: 'easyQuestions', questions: [] },
      2: { name: 'mediumQuestions', questions: [] },
      3: { name: 'hardQuestions', questions: [] }
    }

    availableQuestions.forEach(q => {
      if (q.difficulty >= 1 && q.difficulty <= 3) {
        difficultyMap[q.difficulty].questions.push(q)
      }
    })

    // 2. Validate question counts
    for (const level of [1, 2, 3]) {
      if (difficultyMap[level].questions.length < MIN_PER_LEVEL) {
        throw new Error(`Insufficient ${difficultyMap[level].name}: ${difficultyMap[level].questions.length}`)
      }
    }

    // 3. Create linked lists structure
    const sortedLists = {}
    for (const level of [1, 2, 3]) {
      const shuffled = [...difficultyMap[level].questions]
        .sort(() => Math.random() - 0.5)
        .slice(0, MIN_PER_LEVEL)

      sortedLists[difficultyMap[level].name] = shuffled.reduceRight((acc, curr, index) => ({
        _id: curr.id,
        data: curr.question,
        next: acc,
        difficulty: level,
        value: (index + 1) * 100 * level
      }), null)
    }

    return {
      success: true,
      data: sortedLists
    }

  } catch (err) {
    console.error('Sorting Error:', err)
    return {
      success: false,
      message: err.message,
      code: 'SORT_ERROR'
    }
  }
}