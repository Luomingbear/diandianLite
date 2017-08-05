// pages/storyDetail/storyDetail.js
var sid = ""
var comment = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    story: {},
    outDate: false,
    commentList: [],
    btnBg: "#eff1f4",
    inputValue:''//绑定的输入框文本
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    sid = options.id
    console.log(sid)

    var storyUtil = require("../../utils/getStoryUtil.js")
    var that = this
    storyUtil.getStoryInfo(sid, that)

    storyUtil.getStoryHotComment(sid, that)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var storyUtil = require("../../utils/getStoryUtil.js")
    var that = this
    console.log(sid)
    storyUtil.getStoryInfo(sid, that)
    storyUtil.getStoryHotComment(sid, that)
  },

  // 查看全部评论
  seeAllComments: function (e) {
    wx.navigateTo({
      url: '../comments/comments?sid=' + sid
    })
  },

  /*
  评论输入
  */
  commentInput: function (e) {
    comment = e.detail.value
      var that = this
    if (comment!="") {
      that.setData({
        btnBg : "#FC4338"
      })
    }else{
      that.setData({
        btnBg : "#eff1f4"
      })
    }
  },

  // 发布评论
  send: function () {
    if (comment == "") {
      wx.showToast({
        title: "请输入评论",
        image: "../../image/warming.png"
      })
    } else {
      var storyUtil = require("../../utils/getStoryUtil.js")
      var that = this
      wx.getStorage({
        key: 'dId',
        success: function (res) {
          var util = require("../../utils/util.js")
          var commentData = {
            storyId: sid,
            userId: res.data,
            comment: comment,
            createTime: util.getCurFormatTime()
          }
          console.log(commentData)
          storyUtil.issuseComment(commentData, that)
        },
        fail: function () {
          wx.showModal({
            title: '是否登陆账户？',
            content: '评论功能需要登陆账户，是否前往登陆账户？',
            success: function (res) {
              wx.navigateTo({
                url: '../login/login',
              })
            }
          })
        }
      })


    }
  }
})