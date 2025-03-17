App({
  globalData: {
    openid: null,
    userName: '',
    userPoints: 0,
    userTier: '',
  },

  onLaunch: function () {
    // Initialize cloud
    if (!wx.cloud) {
      console.error('Cloud is not enabled in this environment.');
      return;
    }
    wx.cloud.init({
      env: 'eco-quest-3gwkqe8gdf32aa70', // Your cloud environment ID
      traceUser: true,
    });

    // Perform login and fetch user data
    this.login();
  },

  login: function () {
    wx.login({
      success: (res) => {
        if (res.code) {
          // Call cloud function to get openid
          this.getOpenid(res.code);
        } else {
          console.error('Login failed', res.errMsg);
        }
      },
      fail: (err) => {
        console.error('Login failed', err);
      }
    });
  },

  getOpenid: function (code) {
    wx.cloud.callFunction({
      name: 'getOpenID',
      data: { code: code },
      success: (res) => {
        if (res.result.openid) {
          this.globalData.openid = res.result.openid;
          // Fetch user data based on the openid
          this.getUserData(this.globalData.openid);
        } else {
          console.error('Failed to get openid');
        }
      },
      fail: (err) => {
        console.error('Cloud function failed', err);
      }
    });
  },

  getUserData: function (openid) {
    wx.cloud.callFunction({
      name: 'getUserData', // Cloud function to fetch user data
      data: { openid: openid },
      success: (res) => {
        if (res.result) {
          const userData = res.result;
          this.globalData.userName = userData.name;
          this.globalData.userPoints = userData.points;
          this.globalData.userTier = userData.tier;
          console.log('User Data:', userData);
        } else {
          console.error('Failed to get user data');
        }
      },
      fail: (err) => {
        console.error('Cloud function failed', err);
      }
    });
  }
});
