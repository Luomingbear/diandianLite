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
      that.data.items = list.data;
      // console.log(list.data);
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
      that.data.items = list.data;
      // console.log(list.data);
      that.setData({
        cardList: list.data
      });
      wx.hideLoading();
      wx.stopPullDownRefresh();
    }
  })
}


module.exports.getRecommendStory = getRecommendStory
module.exports.getNearStory = getNearStory
