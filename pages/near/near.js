// pages/near/near.js
var page = 1;
var recommendUtil = require('../../utils/getStoryUtil.js');
var postData;
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
      title: '正在拷问服务器',
    })
    var that = this;
    wx.getLocation({
      success: function (res) {
        var lat = res.latitude;
        var lng = res.longitude;

        postData = {
          scale: 16,
          latitude: lat,
          longitude: lng
        };

        recommendUtil.getNearStory(postData, 1, that);
      }
    })
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showLoading({
      title: '正在拷问服务器',
    })
    var that = this;
    recommendUtil.getNearStory(postData, 1, that);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
})