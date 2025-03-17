const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

exports.main = async (event, context) => {
  const { action } = event
  const db = cloud.database()
  const _ = db.command
  const wxContext = cloud.getWXContext()

  try {
    switch(action) {
      // cloud/functions/user/index.js
    case 'getScore':
      const userRef = db.collection('users').doc(wxContext.OPENID)
      const userRes = await userRef.get()
      
      if (!userRes.data) {
        // Create new user with initialized daily_points
        await userRef.set({
          daily_points: 0,
          avatar: '',
          username: 'New Player',
          created: db.serverDate()
        })
        return { data: { daily_points: 0 } }
      }
      
      return { 
        data: { 
          daily_points: userRes.data.daily_points || 0,
          ...userRes.data 
        }
      }
        
      case 'updateScore':
        await db.collection('users')
          .doc(wxContext.OPENID)
          .update({
            data: {
              daily_points: _.inc(event.points),
              last_played: db.serverDate()
            }
          })
        return { success: true }
        
      default:
        throw new Error('Invalid action')
    }
  } catch (err) {
    console.error('User function error:', err)
    return { success: false, error: err.message }
  }
}