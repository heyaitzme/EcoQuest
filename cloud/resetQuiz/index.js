const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

exports.main = async () => {
  try {
    const today = new Date().toISOString().split('T')[0]
    await db.collection('Daily_Quiz')
      .where({ date: today })
      .remove()
  } 
  catch (err) {
    console.error('Reset error:', err)
    return { success: false, message: err.message }
  }
}