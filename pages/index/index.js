//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    startTimeHead: "00",
    startTimeEnd: "00",
    endTimeHead: "00",
    endTimeEnd: "00",
    blankTimeHead: "00",
    blankTimeEnd: "00",
    count: 1
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  //点击按钮将对应的时间值显示在界面上
  sendNumber: function (e) {
    //操作前做判断，如果是上次计算完的状态则清空
    if (this.data.count == 9) {
      this.clearAll()
    }
    //获取当前按钮的值
    var number = e.currentTarget.dataset.text;
    //通过判断点击次数来进行操作
    if (this.data.count == 1) {
      this.setData({
        startTimeHead: number
      })
    } else if (this.data.count == 2) {
      this.setData({
        startTimeHead: this.data.startTimeHead + number
      })
    } else if (this.data.count == 3) {
        this.setData({
          startTimeEnd: number
        })
    } else if (this.data.count == 4) {
      this.setData({
        startTimeEnd: this.data.startTimeEnd + number
      })
    } else if (this.data.count == 5) {
      this.setData({
        endTimeHead: number
      })
    } else if (this.data.count == 6) {
      this.setData({
        endTimeHead: this.data.endTimeHead + number
      })
    } else if (this.data.count == 7) {
      this.setData({
        endTimeEnd: number
      })
    } else if (this.data.count == 8) {
      this.setData({
        endTimeEnd: this.data.endTimeEnd + number
      })
    }
    //每次点击按钮，count都会自增1,当count==8时归零
    if (this.data.count == 8) {
      this.calcTime()
      this.setData({
        count: 9
      })
    } else {
      this.setData({
        count: this.data.count + 1
      })
    }
  },

  //计算两个时间的间隔时间
  calcTime: function () {
    var earlyTime = parseInt(this.data.startTimeHead) * 60 + parseInt(this.data.startTimeEnd)
    var lateTime = parseInt(this.data.endTimeHead) * 60 + parseInt(this.data.endTimeEnd)
    //计算两个时间之间的分钟差
    var middleTime = lateTime - earlyTime
    if (middleTime <= 0) {
      middleTime = middleTime + 1440
    }
    var hour = parseInt(middleTime / 60)
    var minute = middleTime % 60
    //若小时数是一位数则在前面补零
    if ( hour < 10 ) {
      this.setData({
        blankTimeHead: "0" + hour.toString()
      })
    } else {
      this.setData({
        blankTimeHead: hour.toString()
      })
    }
    //若分钟数为一位数则在前面补零
    if (minute < 10) {
      this.setData({
        blankTimeEnd: "0" + minute.toString()
      })
    } else {
      this.setData({
        blankTimeEnd: minute.toString()
      })
    }
  },

  //将所有数值初始化
  clearAll: function () {
    this.setData({
      startTimeHead: "00",
      startTimeEnd: "00",
      endTimeHead: "00",
      endTimeEnd: "00",
      blankTimeHead: "00",
      blankTimeEnd: "00",
      count: 1
    })
  },





  //-----------------------------
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
