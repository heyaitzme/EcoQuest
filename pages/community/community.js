Page({
  data: {
    posts: [],
  },

  onLoad: function () {
    this.loadPosts();
  },

  // Load posts from the database or backend
  loadPosts: function () {
    // Simulating a database call to load posts
    const posts = [
      {
        id: 1,
        avatarUrl: '/images/avatar1.png',
        username: 'EcoWarrior1',
        content: 'Just completed my daily challenge!',
        timestamp: '2024-08-31 14:20',
      },
      {
        id: 2,
        avatarUrl: '/images/avatar2.png',
        username: 'EcoHero',
        content: 'Recycled 50 bottles today!',
        timestamp: '2024-08-31 13:45',
      },
      // Additional posts...
    ];

    this.setData({
      posts: posts,
    });
  },

  // Navigate to Create Post Page
  createNewPost: function () {
    wx.navigateTo({
      url: '/pages/createPost/createPost',
    });
  },
});
