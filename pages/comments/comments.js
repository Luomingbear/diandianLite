// pages/comments/comments.js
var page = 1
var sid = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     sid = options.sid;
    var storyUtil = require("../../utils/getStoryUtil.js")
    var that = this;
    storyUtil.getStoryAllComment(sid,page,that);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    page = 1
    this.data.commentList = []
    var storyUtil = require("../../utils/getStoryUtil.js")
    var that = this;
    storyUtil.getStoryAllComment(sid,page,that);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
     wx.showLoading({
      title: '正在拷问服务器',
    })
    page++
    var storyUtil = require("../../utils/getStoryUtil.js")
    var that = this;
    storyUtil.getStoryAllComment(sid,page,that);
  },

  clickSeeMore :function(e){
    wx.showLoading({
      title: '正在拷问服务器',
    })
    page++
    var storyUtil = require("../../utils/getStoryUtil.js")
    var that = this;
    storyUtil.getStoryAllComment(sid,page,that);
  }
})