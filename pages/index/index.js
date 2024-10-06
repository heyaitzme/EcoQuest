// home.js
Page({
  data: {
    username: "EcoWarrior",
    points: 0,
    tier: "Green Leaf",
  },

  onLoad: function () {
    // Fetch user data from storage or backend API
    this.getUserData();
  },

  getUserData: function () {
    // For demonstration, using mock data. Replace with an API call.
    const userData = {
      username: "EcoWarrior",
      points: 150,
      tier: "Green Leaf",
    };

    this.setData({
      username: userData.username,
      points: userData.points,
      tier: userData.tier,
    });
  },
});
