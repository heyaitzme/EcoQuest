wx.cloud.init();
const db=wx.cloud.database();
Page({
  data: {
    posts: [],
  },

  onLoad: function () {
    this.fetchPosts();
  },

  // Load posts from the database or backend
  fetchPosts: function () {
    db.collection('Posts').orderBy('timestamp', 'desc').get({
      success: res => {
        this.setData({
          posts: res.data
        });
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: 'Failed to load posts'
        });
        console.error('[Database] [Fetch] failed: ', err);
      }
    });
  },
  submitPost(e) {
    const content = e.detail.value.content.trim();
    if (!content) {
      wx.showToast({
        icon: 'none',
        title: 'Post content cannot be empty'
      });
      return;
    }

    // Assume user info is available
    const author = wx.getStorageSync('userInfo')?.nickName || 'Anonymous';

    db.collection('Posts').add({
      data: {
        content,
        author,
        timestamp: db.serverDate(),
        likes: 0
      },
      success: res => {
        wx.showToast({
          title: 'Post successful',
          icon: 'success'
        });
        this.fetchPosts(); // Refresh the posts
        console.log("Post successful!", res);
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: 'Failed to post'
        });
        console.error('[Database] [Add] failed: ', err);
      }
    });
  },

  likePost(e) {
    const postId = e.currentTarget.dataset.id;
    const postIndex = this.data.posts.findIndex(post => post._id === postId);
    if (postIndex === -1) return;

    const newLikes = this.data.posts[postIndex].likes + 1;

    db.collection('Posts').doc(postId).update({
      data: {
        likes: newLikes
      },
      success: res => {
        const updatedPosts = [...this.data.posts];
        updatedPosts[postIndex].likes = newLikes;
        this.setData({
          posts: updatedPosts
        });
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: 'Failed to like post'
        });
        console.error('[Database] [Update] failed: ', err);
      }
    });
  },

  formatTime(timestamp) {
    const date = timestamp ? timestamp.toDate() : new Date();
    return date.toLocaleString();
  }
});
