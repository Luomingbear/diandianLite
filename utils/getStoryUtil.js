// 获取推荐的故事
var SUCCEED = 200
var FAILED = 1000
var EMPTY = 700
var ERROR = 500

function getRecommendStory(page, that) {
  wx.request({
    url: 'https://api.storyshu.com/getRecommendStory.php',
    data: {
      cityName: "杭州市"
    },
    header: {
      'content-type': 'application/json'
    },
    method: "POST",
    dataType: "JSON",
    success: function (res) {
      var util = require("util.js")
      var parse = JSON.parse(res.data);
      var list = parse.data
      console.log(list)
      for (var i = 0; i < list.length; i++) {
        var item = list[i]
        var time = util.formatCreateTime(item.createTime)
        item.createTime = time
        item.destroyTime = util.formatDestroyTime(item.destroyTime)
      }
      that.setData({
        cardList: list
      });
      wx.hideLoading();
      wx.stopPullDownRefresh();
    }
  })
}

// 获取附近的故事
function getNearStory(postData, page, that) {
  wx.request({
    url: 'https://api.storyshu.com/getNearStory.php',
    data: {
      scale: postData.scale,
      latitude: postData.latitude,
      longitude: postData.longitude
    },
    header: {
      'content-type': 'application/json'
    },
    method: "POST",
    dataType: "JSON",
    success: function (res) {
      var util = require("util.js")
      var parse = JSON.parse(res.data);
      var list = parse.data
      for (var i = 0; i < list.length; i++) {
        var item = list[i]
        var time = util.formatCreateTime(item.createTime)
        item.createTime = time
        item.destroyTime = util.formatDestroyTime(item.destroyTime)
      }
      that.setData({
        cardList: list
      });
      wx.hideLoading();
      wx.stopPullDownRefresh();
    }
  })
}

// 获取用户发布的所有故事
function getUserStory(uid, pages, that) {
  wx.request({
    url: 'https://api.storyshu.com/getUserStory.php',
    data: {
      userId: uid,
      page: pages
    },
    header: {
      'content-type': 'application/json'
    },
    method: "POST",
    dataType: "JSON",
    success: function (res) {
      var util = require("util.js")
      var parse = JSON.parse(res.data);
      console.log(parse)
      var list = parse.data
      for (var i = 0; i < list.length; i++) {
        var item = list[i]
        var time = util.formatCreateTime(item.createTime)
        item.createTime = time
        item.destroyTime = util.formatDestroyTime(item.destroyTime)
      }

      var beforeList = that.data.cardList

      that.setData({
        cardList: beforeList.concat(list)
      });
      wx.hideLoading();
      wx.stopPullDownRefresh();
    }
  })
}

// 获取故事详情
function getStoryInfo(storyId, that) {
  wx.request({
    url: 'https://api.storyshu.com/getStoryInfo.php',
    data: {
      storyId: storyId,
    },
    header: {
      'content-type': 'application/json'
    },
    method: "POST",
    dataType: "JSON",
    success: function (res) {
      var result = JSON.parse(res.data)
      var item = result.data
      var util = require("util.js")
      item.destroyTime = util.formatDestroyTime(item.destroyTime)

      that.setData({
        story: item,
        outDate: util.isOutDate(item.destroyTime)
      });
      wx.hideLoading();
      wx.stopPullDownRefresh();
    }
  })
}

// 获取故事的热门评论
function getStoryHotComment(storyId, that) {
  wx.request({
    url: 'https://api.storyshu.com/getHotComment.php',
    data: {
      storyId: storyId,
    },
    header: {
      'content-type': 'application/json'
    },
    method: "POST",
    dataType: "JSON",
    success: function (res) {
      var result = JSON.parse(res.data);
      var list = result.data
      var util = require("util.js")
      for (var i = 0; i < list.length; i++) {
        var item = list[i]
        item.createTime = util.formatCreateTime(item.createTime)
      }
      console.log(result)
      that.setData({
        commentList: list
      });
      wx.hideLoading();
      wx.stopPullDownRefresh();
    }
  })
}

// 获取故事的所有评论
function getStoryAllComment(storyId, page, that) {
  wx.request({
    url: 'https://api.storyshu.com/getStoryComment.php',
    data: {
      storyId: storyId,
      page: page
    },
    header: {
      'content-type': 'application/json'
    },
    method: "POST",
    dataType: "JSON",
    success: function (res) {
      var result = JSON.parse(res.data);
      console.log(result)
      if (result.code == SUCCEED) {
        var list = result.data
        var util = require("util.js")
        for (var i = 0; i < list.length; i++) {
          var item = list[i]
          item.createTime = util.formatCreateTime(item.createTime)
        }

        var beforeList = that.data.commentList
        beforeList.concat(list)
        that.setData({
          commentList: beforeList.concat(list)
        });
      }

      wx.hideLoading();
      wx.stopPullDownRefresh();
    }
  })
}

/**
* 发布评论
*/
function issuseComment(commentData, that) {
  wx.request({
    url: 'https://api.storyshu.com/issueComment.php',
    data: {
      storyId: commentData.storyId,
      userId: commentData.userId,
      comment: commentData.comment,
      createTime: commentData.createTime
    },
    header: {
      'content-type': 'application/json'
    },
    method: "POST",
    dataType: "JSON",
    success: function (res) {
      var result = JSON.parse(res.data);
      console.log(result)
      if (result.code == SUCCEED) {
        that.setData({
          inputValue: '' //清空输入
        })
        getStoryHotComment(commentData.storyId, that)

        wx.showToast({
          title: "评论成功"
        })
      } else {
        wx.showToast({
          title: "评论失败"
        })
      }
    }
  })
}

module.exports.getRecommendStory = getRecommendStory
module.exports.getNearStory = getNearStory
module.exports.getUserStory = getUserStory
module.exports.getStoryInfo = getStoryInfo
module.exports.getStoryHotComment = getStoryHotComment
module.exports.getStoryAllComment = getStoryAllComment
module.exports.issuseComment = issuseComment