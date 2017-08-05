// pages/mine/mine.js

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      avatar: "https://image.storyshu.com/storyshu_avatar.jpg",
      nickname: "点点"
    },
    buttonBgo: '#fff',
    buttonBgt: '#fff',
    buttonBgr: '#fff',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

  onShow: function () {
    var that = this
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        console.log(res.data)
        if (res.data != null) {
          that.setData({
            userInfo: res.data
          })
        }
      },
    })

  },

  touchStart1: function (e) {
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

  }, touchStart3: function (e) {
    var that = this
    that.setData({
      buttonBgr: "#eff1f4"
    })
  },

  touchEnd: function (e) {

    var that = this
    that.setData({
      buttonBgo: "#fff",
      buttonBgt: "#fff",
      buttonBgr: "#fff",
    })
  },

  myStoryTap: function (e) {
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        console.log(res.data)
        if (res.data == null) {
          
          wx.navigateTo({
            url: '../login/login'
          })
        } else {
          wx.navigateTo({
            url: '../mystory/mystory',
          })
        }
      }, fail: function (res) {
        wx.navigateTo({
          url: '../login/login'
        })
      }
    })

  },

  myTagTap: function () {
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        console.log(res.data)
        if (res.data == null) {
          wx.navigateTo({
            url: '../login/login'
          })
        } else {
          wx.navigateTo({
            url: '../mytag/mytag',
          })
        }
      }, fail: function (res) {
        wx.navigateTo({
          url: '../login/login'
        })
      }
    })

  },

  // 退出登陆
  logoutTap: function (e) {
    wx.showModal({
      title: '退出登陆',
      content: '确定退出登陆吗？点击确定将清除用户在本地保留的数据',
      success: function (res) {
        if (res.confirm) {
          wx.clearStorage()
          wx.showToast({
            title: '退出成功',
          })
          var that = this
          that.setData({
            userInfo: {
              avatar: "https://image.storyshu.com/storyshu_avatar.jpg",
              nickname: "点点"
            }
          })
        }

      }
    })
    wx.navigateTo({
      url: '../setting/setting',
    })
  }
})