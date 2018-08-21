//app.js，这是小程序的入口初始化文件
App({
  //onLaunch会在小程序初始化完成后自动执行一次
  onLaunch: function() {
    // 展示本地存储能力，获取本地缓存中的logs属性，如果值为空，那么设置logs=[]
    var logs = wx.getStorageSync('logs') || []
    //将当前登录时间添加到数组中
    logs.unshift(Date.now())
    //将数据存入本地缓存，因为wx为全局对象，所以可以在其他文件中直接wx.getStorageSync('logs')获取本地缓存数据
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })


    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              //此处就是为了防止Page.onLoad之后，getUserInfo才获取到数据，可能会导致Page中的userInfo为空，所以用callback重新进行赋值。
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})

App({
onLaunch:function(){
  var logs=wx.getStorageSync('logs')||[]
  logs.unshift(Date.now())
  wx.setStorageSync('logs', logs)
},

getUserInfo:function(cb){
},
globalData:{
  userInfo:null
}
}
)