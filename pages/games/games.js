Page({
  data: {
    // Define your data properties here if needed
  },

  startEcoTrivia() {
    // Logic to start Eco Trivia game
    wx.navigateTo({
      url: '/pages/eco-trivia/eco-trivia'
    });
  },

  startRecyclingPuzzle() {
    // Logic to start Recycling Puzzle game
    wx.navigateTo({
      url: '/pages/recycling-puzzle/recycling-puzzle'
    });
  },

  startSustainabilityQuiz() {
    // Logic to start Sustainability Quiz game
    wx.navigateTo({
      url: '/pages/sustainability-quiz/sustainability-quiz'
    });
  }
});
