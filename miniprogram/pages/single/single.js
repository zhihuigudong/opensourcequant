const app = getApp();
const db = wx.cloud.database();
var util = require('../../utils/util.js');
Component({
  data: {
    tabList:[
      {title:'策略操作'},
      {title:'策略说明'}
    ],
    hiddenName1: false,
    hiddenName2: false,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    TabCur: 0,
    scrollLeft: 0,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    urlList: [
      { imagePath: 'https://6d79-mywxapp-eafa79-1255469223.tcb.qcloud.la/01.jpg' },
      { imagePath: 'https://6d79-mywxapp-eafa79-1255469223.tcb.qcloud.la/02.jpg' },
      { imagePath: 'https://6d79-mywxapp-eafa79-1255469223.tcb.qcloud.la/03.jpg' },
      { imagePath: 'https://6d79-mywxapp-eafa79-1255469223.tcb.qcloud.la/04.jpg' },
      { imagePath: 'https://6d79-mywxapp-eafa79-1255469223.tcb.qcloud.la/05.jpg' },
      { imagePath: 'https://6d79-mywxapp-eafa79-1255469223.tcb.qcloud.la/06.jpg' }
    ],
    holdList: []
  },
  methods: {
    //事件处理函数
    bindViewTap: function () {
      wx.navigateTo({
        url: '../logs/logs'
      })
    },
    CopyLink(e) {
      wx.setClipboardData({
        data: e.currentTarget.dataset.link,
        success: res => {
          wx.showToast({
            title: '已复制',
            duration: 1000,
          })
        }
      })
    },
    tabSelect(e) {
      console.log(e);
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60
      })
    },

    clickMe1: function (e) {
      this.setData({
        hiddenName1: !this.data.hiddenName1
      })
    },
    clickMe2: function (e) {
      this.setData({
        hiddenName2: !this.data.hiddenName2
      })
    },
    onLoad: function () {
      var time = util.formatDate(new Date())
      //为页面中time赋值
      this.setData({
        time: time
      })
      //打印
      console.log(time)
      if (app.globalData.userInfo) {
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
      } else if (this.data.canIUse) {
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
      var _this = this;
      //2、开始查询数据了  news对应的是集合的名称
      db.collection('operation').get({
        //如果查询成功的话
        success: res => {
          //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值
          this.setData({
            holdList: res.data
          })
        }
      })
    },
    getUserInfo: function (e) {
      console.log(e)
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
  },

  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        })
      }
    }
  }
})
