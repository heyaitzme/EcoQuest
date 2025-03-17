Page({
  data: {
    userName: '',
    userPoints: 0,
    userTier: ''
  },

  onLoad: function () {
    // Access global data and update the page's data
    const app = getApp();
    this.setData({
      userName: app.globalData.userName,
      userPoints: app.globalData.userPoints,
      userTier: app.globalData.userTier
    });
  }
});
