//格式化创建时间
function formatCreateTime(time) {
  var date = new Date(time)
  var curTime = new Date()
  var diff = (curTime.getTime() - date.getTime()) / 1000

  if (diff <= 0) {
    return date.getMonth() + "月" + date.getDate() + "日，已过期"
  } else if (diff < 60 * 60) {
    return parseInt(diff / 60 + 0.5) + "分钟前"
  } else if (diff < 60 * 60 * 24) {
    return parseInt(diff / 60 / 60 + 0.5) + "小时前"
  } else if (diff < 60 * 60 * 24 * 7) {
    return parseInt(diff / 60 / 60 / 24 + 0.5) + "天前"
  } else {
    return (date.getMonth() + 1) + "月" + date.getDate() + "日" + date.getHours() + "电" + date.getMinutes() + "分"
  }
  return diff
}

// 格式化销毁时间
function formatDestroyTime(time) {
  var date = new Date(time)
  var curDate = new Date()

  var restTime = (date.getTime() - curDate.getTime()) / 1000
  if (restTime <= 0) {
    return (date.getMonth() + 1) + "月" + date.getDate() + "日，已过期"
  } else if (restTime < 60 * 60) {
    return "剩余" + parseInt(restTime / 60 + 0.5) + "分钟"
  } else if (restTime < 60 * 60 * 24) {
    return "剩余" + parseInt(restTime / 60 / 60 + 0.5) + "小时"
  } else {
    return "剩余" + parseInt(restTime / 60 / 60 / 24 + 0.5) + "天"
  }

  return restTime
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function formatTime(date) {

}

/**
 * 获取当前时间的格式化字符串
 * 2017-08-04 18:18:42
 */
function getCurFormatTime() {
  var date = new Date()
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second
}

/**
*是否过期
*/
function isOutDate(time) {
  var destroyTime = new Date(time)
  var curTime = new Date()
  if (curTime.getTime() - destroyTime.getTime() >= 0) {
    return true
  } else return false
}

function weixinLogin(userInfo,that) {
  wx.login({
    success: function (res) {
      wx.request({
        url: 'https://api.storyshu.com/wxLogin.php',
        data: {
          code: res.code,
          nickname: userInfo.nickName,
          avatar: userInfo.avatarUrl,
          grant: 1
        },
        header: {
          'content-type': 'application/json'
        },
        method: "POST",
        dataType: "JSON",
        success: function (res) {
          // {"session_key":"r97uXNiejogjb38Sqk601A==","expires_in":7200,"openid":"odezs0GNoeMm_T6mVCbfIVdHOkYw"}
          console.log(res.data)
          var parse = JSON.parse(res.data)
          wx.setStorage({
            key: 'dId',
            data: parse.data.userId,
          })
          var userInfo = {
            userId: parse.data.userId,
            nickname: parse.data.nickname,
            avatar: parse.data.avatar
          }
          wx.setStorage({
            key: 'userInfo',
            data: userInfo,
          })

          //关闭当前页面，返回
          wx.navigateBack({
            delta: 1
          })
        }
      })
    }
  })
}

module.exports = {
  formatTime: formatTime,
  formatDestroyTime: formatDestroyTime,
  formatCreateTime: formatCreateTime,
  getCurFormatTime: getCurFormatTime,
  isOutDate: isOutDate,
  weixinLogin: weixinLogin
}
