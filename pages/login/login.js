// pages/login/login.js
var email = "";
var password = "";
var md5Util = require('../../utils/md5.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  dLogin: function (event) {
    var that = this
    if (email == null || email == "") {
      wx.showToast({
        title: '请输入邮箱',
        image: "../../image/warming.png"
      })
    } else if (password == null || password == "") {
      wx.showToast({
        title: '请输入密码',
        image: "../../image/warming.png"
      })
    }

    var passwordMd5 = md5Util.hexMD5(email + password)
    console.log(passwordMd5)

    wx.request({
      url: 'https://api.storyshu.com/loginUser.php',
      data: {
        email: email,
        password: passwordMd5,
      },
      header: {
        'content-type': 'application/json'
      },
      method: "POST",
      dataType: "JSON",
      success: function (res) {
        var result = JSON.parse(res.data);
        console.log(result)

        if (result.code == 200) {
          wx.showToast({
            title: '登陆成功',
          })

          wx.setStorage({
            key: 'dId',
            data: result.data.userId,
          })
          wx.setStorage({
            key: 'userInfo',
            data: result.data,
          })

          //关闭当前页面，返回
          wx.navigateBack({
            delta: 1
          })

        } else {
          wx.showToast({
            title: '登陆失败',
            image: "../../image/warming.png"
          })
        }
      }
    })
  },

  emailInput: function (event) {
    email = event.detail.value
  },

  passwordInput: function (event) {
    password = event.detail.value
  },

  dRegister: function (e) {
  },

  /**
   * 微信登陆
   */
  weixinLoginTap: function () {
    wx.getUserInfo({
      success: function (res) {
        var util = require("../../utils/util.js")
        var that = this
        util.weixinLogin(res.userInfo, that)
      }
    })

  }
})