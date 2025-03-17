const app = getApp()

Page({
  data: {
    loading: true,
    score: 0,
    questions: [[], [], []], // 3 difficulties, 4 questions each
    showModal: false,
    currentQuestion: null,
    selectedAnswer: null,
    currentPosition: null,
    error: ''
  },

  onLoad() {
    this.loadDailyQuiz()
    this.loadUserScore()
  },

  async loadDailyQuiz() {
    console.log("loadDailyQuiz called!")
    this.setData({ loading: true, error: '' })
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'updateDailyQuiz'
      })
      if (result.success) {
        // Use data directly from cloud function
        let quizData = result.data
        // Handle array response from existing quiz check
        if (Array.isArray(quizData)) {
          quizData = quizData[0]
        }
        this.processQuizData(quizData)
        console.log(quizData)
      } else {
        throw new Error(result.message)
      }
    } catch (err) {
      console.error('Quiz load error:', err)
      this.setData({ 
        error: 'Failed to load daily quiz',
        loading: false
      })
    }
  },

  processQuizData(quizData) {
    // Ensure proper 3x4 grid structure
    const formattedQuestions = [[[], [], [], []], [[], [], [], []], [[], [], [], []]]
  
    quizData.questions.forEach((difficultyRow, rowIndex) => {
      difficultyRow.forEach((question, colIndex) => {
        // Ensure we have 3 rows with 4 columns each
        if (rowIndex < 3 && colIndex < 4) {
          formattedQuestions[rowIndex][colIndex] = {
            ...question,
            answered: quizData.answered[rowIndex][colIndex] || false,
            value: (colIndex + 1) * 100 * (rowIndex + 1)
          }
        }
      })
    })
  
    this.setData({
      questions: formattedQuestions,
      loading: false
    })
  },

  async loadUserScore() {
    const { result } = await wx.cloud.callFunction({
      name: 'user',
      data: { action: 'getScore' }
    })

    this.setData({ 
      score: (result.data?.daily_points || 0),
      loading: false
    })
  },

  showQuestion(e) {
    const { row, col } = e.currentTarget.dataset
    const question = this.data.questions[row][col]
    
    if (question.answered) return

    this.setData({
      showModal: true,
      currentQuestion: question,
      currentPosition: { row, col }
    })
  },

  handleAnswer(e) {
    this.setData({ selectedAnswer: parseInt(e.detail.value) })
  },

  submitAnswer() {
    const { currentQuestion, selectedAnswer, currentPosition } = this.data;
    if (selectedAnswer === null) {
      wx.showToast({ title: 'Please select an answer', icon: 'none' });
      return;
    }
  
    // Parse the correct answer from currentQuestion.answer
    let correctIndex;
    const answer = currentQuestion.answer.toString().trim();
  
    // Handle answers like "(A)", "A", "1", or "ans: A"
    const match = answer.match(/$$?([A-Da-d])$$?|ans:\s*([A-Da-d])|(\d+)/);
    if (match) {
      let letterOrNumber = match[1] || match[2] || match[3];
      if (letterOrNumber) {
        letterOrNumber = letterOrNumber.toUpperCase();
        if (['A', 'B', 'C', 'D'].includes(letterOrNumber)) {
          correctIndex = currentQuestion.choices.findIndex(choice => 
            choice.startsWith(`${letterOrNumber}.`)
          );
        } else if (!isNaN(letterOrNumber)) {
          // Handle 1-based numeric answers
          correctIndex = parseInt(letterOrNumber) - 1;
        }
      }
    }
  
    // Fallback to 0 if parsing fails
    correctIndex = correctIndex !== undefined ? correctIndex : 0;
  
    const isCorrect = selectedAnswer === correctIndex;
  
    if (isCorrect) {
      // Update local state and score
      const newQuestions = [...this.data.questions];
      newQuestions[currentPosition.row][currentPosition.col].answered = true;
      const newScore = this.data.score + currentQuestion.value;
  
      // Update backend
      wx.cloud.callFunction({
        name: 'user',
        data: { 
          action: 'updateScore',
          points: currentQuestion.value
        }
      });
  
      this.setData({
        questions: newQuestions,
        score: newScore,
        showModal: false
      });
    } else {
      wx.showToast({ title: 'Incorrect! Try again', icon: 'none' });
    }
  },

  closeModal() {
    this.setData({ showModal: false })
  },

  refreshQuiz() {
    this.setData({ loading: true })
    this.loadDailyQuiz()
  },

  async resetUsedQuestions() {
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'resetQuiz'
      })
      
      if (result.success) {
        wx.showToast({ title: 'Quiz reset!' })
        this.loadDailyQuiz()
        this.setData({ score: 0 })
      } else {
        throw new Error(result.message)
      }
    } catch (err) {
      console.error('Reset error:', err)
      wx.showToast({
        title: 'Reset failed: ' + err.message,
        icon: 'none'
      })
    }
  }
})