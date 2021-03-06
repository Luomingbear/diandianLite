// pages/recommend/recommend.js
var lat = 30;
var lng = 120;
var page = 1;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title:"正在拷问服务器"
    })
var that = this;
    var recommendUtil = require('../../utils/getStoryUtil.js')
    wx.getStorage({
      key: 'latlng',
      success: function (res) {

        recommendUtil.getRecommendStory(1, that)
      },
      fail: function (res) {
        wx.getLocation({
          success: function (res) {
            var lat = res.latitude;
            var lng = res.longitude;

            postData = {
              scale: 16,
              latitude: lat,
              longitude: lng
            };

            wx.setStorage({
              key: 'latlng',
              data: postData,
            })

            recommendUtil.getRecommendStory(1, that)
          }
        })
      }
    })
  },

  onPullDownRefresh: function (e) {
    var that = this;
    var recommendUtil = require('../../utils/getStoryUtil.js')

    recommendUtil.getRecommendStory(1, that)
  },

  // 跳转到具体详情
  navigateToDetail: function (e) {
    console.log(e)
    var id = e.currentTarget.id
    wx.navigateTo({
      url: '../storyDetail/storyDetail?id='+id,
    })
  },
})
