// pages/mystory/mystory.js
var page = 1 //页码
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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    var myStoryUtil = require("../../utils/getStoryUtil.js")

    var did = wx.getStorage({
      key: 'dId',
      success: function (res) {
        console.log(res)
        myStoryUtil.getUserStory(res.data, page, that)
      }
    }
    )
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

})