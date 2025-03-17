Page({
  data: {
    leaderboard: [],
    loading: true,
    error: ''
  },

  onLoad() {
    this.loadLeaderboard();
  },

  loadLeaderboard() {
    this.setData({ loading: true, error: '' });
    wx.cloud.callFunction({
      name: 'leaderboardRanking',
      success: res => {
        if (res.result.code === 200) {
          this.setData({ leaderboard: res.result.data, loading: false });
        } else {
          this.setData({ error: res.result.message, loading: false });
        }
      },
      fail: err => {
        console.error('Cloud Function Error:', err);
        this.setData({ error: 'Failed to load leaderboard', loading: false });
      }
    });
  }
});