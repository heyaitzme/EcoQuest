const cloud = require('wx-server-sdk');
const { LeaderboardBST } = require('./bst');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

exports.main = async (event, context) => {
  try {
    const db = cloud.database();
    const { data } = await db.collection('users')
      .field({ _id: true, profile_pic: true, username: true, daily_points: true })
      .get();

    const bst = new LeaderboardBST();
    const processedData = bst.getSortedLeaderboard(
      data.map(({ _id, ...rest }) => ({
        id: _id,
        score: rest.daily_points, // Map daily_points to score
        ...rest
      }))
    );

    return { code: 200, data: processedData.slice(0, 100), message: 'Success' };
  } catch (err) {
    console.error('Error:', err);
    return { code: 500, data: null, message: 'Failed' };
  }
};