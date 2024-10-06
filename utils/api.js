const baseUrl = "https://api.yourbackend.com";

const fetchUserData = (userId) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${baseUrl}/user/${userId}`,
      method: "GET",
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(res);
        }
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};

module.exports = {
  fetchUserData,
};
