const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database();
const usersCollection = db.collection('users');

exports.main = async (event, context) => {
  const { openid } = event;

  try {
    // Query the database for user data by openid
    const userRecord = await usersCollection.where({
      openid: openid
    }).get();

    if (userRecord.data.length > 0) {
      // If user found, return the user's data
      const userData = userRecord.data[0];
      return {
        name: userData.name,
        points: userData.points,
        tier: userData.tier,
      };
    } else {
      // If user not found, create a new user with default values
      const newUser = {
        openid: openid,
        name: 'New User',  // Default value
        points: 0,         // Default value
        tier: 'Bronze',    // Default value
        createdAt: new Date(),  // Store the timestamp of account creation
      };

      // Insert the new user data into the Cloud Database
      await usersCollection.add({
        data: newUser
      });

      // Return the newly created user data
      return {
        name: newUser.name,
        points: newUser.points,
        tier: newUser.tier,
      };
    }
  } catch (err) {
    console.error('Error fetching or creating user data:', err);
    return { error: 'Failed to retrieve or create user data' };
  }
};
