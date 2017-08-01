// pages/mine/mine.js

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    buttonBgo:'#fff',
    buttonBgt: '#fff'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        console.log(res.data)
        if (res.data == null) {
          wx.navigateTo({
            url: '../login/login'
          })
        } else {
          that.setData({
            userInfo: res.data
          })
        }
      }, fail: function (res) {
        wx.navigateTo({
          url: '../login/login'
        })
      }
    })
  },

  touchStart1:function(e){
    var that = this
    that.setData({
      buttonBgo: "#eff1f4"
    })
  },

  touchStart2: function (e) {
    var that = this
    that.setData({
      buttonBgt: "#eff1f4"
    })
  },

  touchEnd:function(e){

    var that = this
    that.setData({
      buttonBgo: "#fff",
      buttonBgt: "#fff",
    })
  }
})