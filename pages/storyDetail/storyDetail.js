// pages/storyDetail/storyDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    story:{},
    commentList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var sid = options.id
      console.log(sid)

    var storyUtil = require("../../utils/getStoryUtil.js")
    var that = this
    storyUtil.getStoryInfo(sid,that)

    storyUtil.getStoryHotComment(sid,that)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },
})