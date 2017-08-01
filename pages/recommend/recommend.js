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
    var that = this;
    wx.showLoading({
      title: '正在拷问服务器',
    })
    wx.getLocation({
      success: function (res) {
        lat = res.latitude;
        lng = res.longitude;

        var recommendUtil = require('../../utils/getStoryUtil.js')
        recommendUtil.getRecommendStory(1,that)
      }
    })
  },

  onPullDownRefresh: function (e) {
    wx.showLoading({
      title: '正在拷问服务器',
    })
    
    var that = this;
    var recommendUtil = require('../../utils/getStoryUtil.js')
    recommendUtil.getRecommendStory(1, that)
  },


})
