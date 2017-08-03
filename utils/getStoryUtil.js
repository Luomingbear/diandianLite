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
      var list = JSON.parse(res.data);
      console.log(list.data);
      that.setData({
        cardList: list.data
      });
      wx.hideLoading();
      wx.stopPullDownRefresh();
    }
  })
}

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
      var list = JSON.parse(res.data);
      // console.log(list.data);
      that.setData({
        cardList: list.data
      });
      wx.hideLoading();
      wx.stopPullDownRefresh();
    }
  })
}

function getUserStory(uid, page, that){
  wx.request({
    url: 'https://api.storyshu.com/getUserStory.php',
    data: {
      userId: uid,
      page: page
    },
    header: {
      'content-type': 'application/json'
    },
    method: "POST",
    dataType: "JSON",
    success: function (res) {
      var list = JSON.parse(res.data);
      var beforelist = that.data.cardList
      beforelist.concat(list.data) 
      console.log(beforelist.concat(list.data));
      that.setData({
        cardList: beforelist.concat(list.data)
      }); 
      wx.hideLoading();
      wx.stopPullDownRefresh();
    }
  })
}

function getStoryInfo(storyId,that){
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
      var result = JSON.parse(res.data);
      console.log(result)
      that.setData({
        story:result.data
      });
      wx.hideLoading();
      wx.stopPullDownRefresh();
    }
  })
}


module.exports.getRecommendStory = getRecommendStory
module.exports.getNearStory = getNearStory
module.exports.getUserStory = getUserStory
module.exports.getStoryInfo = getStoryInfo