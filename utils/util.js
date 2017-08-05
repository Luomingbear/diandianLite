function formatTime(time) {
  var date = new Date(time)
  var curTime = new Date()
  var diff = (curTime.getTime() - date.getTime())/1000

  if (diff <= 0) {
    return date.getMonth() + "月" + date.getDate() + "日，已过期"
  } else if (diff < 60 * 60) {
    returnparseInt(diff / 60) + "分钟前"
  } else if (diff < 60 * 60 * 24) {
    return parseInt(diff / 60 / 60) + "小时前"
  } else if(diff<60*60*24*7){
    return parseInt(diff / 60 / 60 / 24) + "天前"
  }else{
    return date.getMonth() + "月" + date.getDate() + "日"+date.getHours()+"时"+date.getMinutes()+"分"
  }
  return diff
}

// 格式化销毁时间
function formatDestroyTime(time) {
  var date = new Date(time)
  var curDate = new Date()

  var restTime = (date.getTime() - curDate.getTime()) / 1000
  if (restTime <= 0) {
    return date.getMonth() + "月" + date.getDate() + "日，已过期"
  } else if (restTime < 60 * 60) {
    return "剩余" + parseInt(restTime / 60) + "分钟"
  } else if (restTime < 60 * 60 * 24) {
    return "剩余" + parseInt(restTime / 60 / 60) + "小时"
  } else {
    return "剩余" + parseInt(restTime / 60 / 60 / 24) + "天"
  }

  return restTime
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatDestroyTime: formatDestroyTime
}
