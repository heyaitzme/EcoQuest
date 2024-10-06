Page({
  data: {
    currentLevel: 1,
    progress: 0,
    currentQuestionIndex: 0,
    questions: [
      {
        question: "What is the primary greenhouse gas responsible for global warming?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        correctAnswer: 1,
      },
      // More questions...
    ],
    showNextButton: false,
    showConfetti: false,
    shakeAnimation: {},
    fadeInAnimation: {},
    correctSound: null,
    incorrectSound: null,
    confettiSound: null,
    userPoints: 0,
    badges: [],
  },

  onLoad() {
    this.setQuestion();
    this.initAnimations();
    this.initSounds();
  },

  initAnimations() {
    this.shakeAnimation = wx.createAnimation({
      duration: 100,
      timingFunction: 'ease',
    });

    this.fadeInAnimation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-in',
    });

    this.setData({
      fadeInAnimation: this.fadeInAnimation.opacity(1).step().export(),
    });
  },

  initSounds() {
    this.correctSound = wx.createInnerAudioContext();
    this.correctSound.src = '/assets/correct.mp3';

    this.incorrectSound = wx.createInnerAudioContext();
    this.incorrectSound.src = '/assets/incorrect.mp3';

    this.confettiSound = wx.createInnerAudioContext();
    this.confettiSound.src = '/assets/confetti.mp3';
  },

  setQuestion() {
    this.fadeInAnimation.opacity(0).step({ duration: 0 });
    this.setData({
      currentQuestion: this.data.questions[this.data.currentQuestionIndex],
      showNextButton: false,
      showConfetti: false,
      fadeInAnimation: this.fadeInAnimation.opacity(1).step().export(),
    });
  },

  selectOption(e) {
    const selectedIndex = e.currentTarget.dataset.index;
    const isCorrect = selectedIndex === this.data.currentQuestion.correctAnswer;
    if (isCorrect) {
      this.handleCorrectAnswer();
    } else {
      this.handleIncorrectAnswer();
    }
  },

  handleCorrectAnswer() {
    this.correctSound.play();
    this.confettiSound.play();
    const newPoints = this.data.userPoints + 10;
    this.setData({
      progress: this.data.progress + 20,
      showNextButton: true,
      showConfetti: true,
      userPoints: newPoints,
    });

    if (newPoints >= 50) {
      this.awardBadge('Eco Warrior');
    }
  },

  handleIncorrectAnswer() {
    this.incorrectSound.play();
    this.shakeAnimation
      .translateX(-10)
      .step()
      .translateX(10)
      .step()
      .translateX(-10)
      .step()
      .translateX(10)
      .step()
      .translateX(0)
      .step();
    this.setData({
      shakeAnimation: this.shakeAnimation.export(),
    });
    wx.showToast({
      title: 'Try again!',
      icon: 'none',
    });
  },

  awardBadge(badgeName) {
    const badges = this.data.badges;
    if (!badges.includes(badgeName)) {
      badges.push(badgeName);
      this.setData({
        badges: badges,
      });
      wx.showToast({
        title: `You've earned the "${badgeName}" badge!`,
        icon: 'success',
      });
    }
  },

  nextQuestion() {
    if (this.data.currentQuestionIndex < this.data.questions.length - 1) {
      this.setData({
        currentQuestionIndex: this.data.currentQuestionIndex + 1,
      });
      this.setQuestion();
    } else {
      wx.showToast({
        title: 'Quiz Completed!',
        icon: 'success',
      });
      this.awardBadge('Environmental Quiz Master');
    }
  },
});
