// pages/mystory/mystory.js
var page = 1 //页码
var dId = 0
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
    var that = this
    var myStoryUtil = require("../../utils/getStoryUtil.js")

    wx.showLoading({
      title: '正在拷问服务器',
    })
    var did = wx.getStorage({
      key: 'dId',
      success: function (res) {
        dId = res.data
        myStoryUtil.getUserStory(res.data, page, that)
      },
      fail(res){
        wx.showToast({
          title: '获取用户信息失败',
          icon: '../../image/warming.png',
        })
      }
    }
    )
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this
    var myStoryUtil = require("../../utils/getStoryUtil.js")

    page = 1 
    myStoryUtil.getUserStory(dId, page, that)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showLoading({
      title: '正在拷问服务器',
    })
   var that = this
    var myStoryUtil = require("../../utils/getStoryUtil.js")

    page ++
    myStoryUtil.getUserStory(dId, page, that)
  },

  clickSeeMore: function (e) {
    var that = this
    var myStoryUtil = require("../../utils/getStoryUtil.js")

    wx.showLoading({
      title: '正在拷问服务器',
    })

    page++   
    myStoryUtil.getUserStory(dId, page, that)
  
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