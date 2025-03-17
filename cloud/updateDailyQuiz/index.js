const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command

// Load questions from properly uploaded JSON file
const questions = require('./questions.json')
console.log("updateDailyQuiz called!")
// Linked list management functions
async function getOrCreateList(difficulty, usedIds) {
  const listNames = {
    1: 'easyQuestions',
    2: 'mediumQuestions',
    3: 'hardQuestions'
  };
  const listName = listNames[difficulty]
  console.log("listDoc: ")
  const listDoc = await db.collection('QuestionLists').doc(listName).get()
  console.log("listDoc: ",listDoc)
  if (listDoc.exists && listDoc.data.questions.length >= 4) {
    return listDoc.data.questions
  }

  // Reload list from source questions
  const filtered = questions.filter(q => 
    q.difficulty === difficulty && !usedIds.has(q.id)
  )
  
  if (filtered.length < 4) {
    throw new Error(`Insufficient ${listName}: ${filtered.length} available`)
  }

  // Shuffle and store new list
  const shuffled = [...filtered].sort(() => Math.random() - 0.5)
  await db.collection('QuestionLists').doc(listName).set({
    questions: shuffled
  })

  return shuffled
}

async function consumeQuestions(listName, count) {
  const transaction = await db.startTransaction()
  try {
    const doc = await transaction.collection('QuestionLists').doc(listName).get()
    // Handle missing document case
    if (!doc.exists) {
      throw new Error(`${listName} document not found`)
    }
    const remaining = doc.data.questions.slice(count)
    
    await transaction.collection('QuestionLists').doc(listName).update({
      data: {
        questions: remaining
      }
    })
    
    await transaction.commit()
    return doc.data.questions.slice(0, count)
  } catch (err) {
    await transaction.rollback()
    throw err
  }
}

exports.main = async (event, context) => {
  console.log("test1")
  try {
    const today = new Date().toISOString().split('T')[0]

    // 1. Check existing daily quiz
    const existingQuiz = await db.collection('Daily_Quiz')
      .where({ date: today })
      .get()
    console.log("test2")
    if (existingQuiz.data.length > 0) {
      return { 
        success: true, 
        message: 'Quiz exists',
        data: existingQuiz.data[0]
      }
    }
    // 2. Get used questions from past 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    const pastQuizzes = await db.collection('Daily_Quiz')
      .where({ date: _.gte(thirtyDaysAgo.toISOString().split('T')[0]) })
      .get()

    const usedIds = new Set()
    pastQuizzes.data.forEach(quiz => {
      quiz.questions.flat(2).forEach(q => usedIds.add(q.id))
    })

    // 3. Refresh linked lists
    const difficulties = [1, 2, 3]
    const listContents = await Promise.all(
      difficulties.map(d => getOrCreateList(d, usedIds))
    )

    // 4. Consume questions from lists
    const selected = await Promise.all([
      consumeQuestions('easyQuestions', 4),
      consumeQuestions('mediumQuestions', 4),
      consumeQuestions('hardQuestions', 4)
    ])

    // 5. Format quiz data
    const formattedData = {
      questions: selected.map((questions, rowIdx) => 
        questions.map((q, colIdx) => ({
          id: q.id,
          question: q.question,
          choices: q.choices,
          difficulty: rowIdx + 1,
          value: (colIdx + 1) * 100 * (rowIdx + 1)
        }))
      ),
      answers: selected.map(row => row.map(q => q.answer)),
      answered: [[false, false, false, false], [false, false, false, false], [false, false, false, false]]
    }

    // 6. Create daily quiz
    const result = await db.collection('Daily_Quiz').add({
      date: today,
      ...formattedData,
      created: db.serverDate()
    })

    return {
      success: true,
      data: {
        _id: result._id,
        date: today,
        questions: formattedData.questions
      }
    }

  } catch (err) {
    console.error('Quiz Generation Error:', err)
    return {
      success: false,
      message: err.message,
      code: err.code || 'INTERNAL_ERROR'
    }
  }
}