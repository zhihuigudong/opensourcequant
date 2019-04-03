const app = getApp();
const db = wx.cloud.database();
Component({
  data: {
    OpenId: app.globalData.OpenId,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    strategyList: []
  },
  methods: {
    onLoad: function () {
      var _this = this;
      //1、引用数据库
      
      //2、开始查询数据了  news对应的是集合的名称
      db.collection('test').get({
        //如果查询成功的话
        success: res => {
          //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值
          this.setData({
            strategyList: res.data
          })
        }
      })
    },
    toChild(e) {
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      })
    },
  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
    }
  }
})
