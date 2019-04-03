const app = getApp();
const db = wx.cloud.database();
var util = require('../../utils/util.js');
Page({

      data: {
        isshare:0,
        strategyId:'',
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        tabList: [
          { title: '回测与持仓' },
          { title: '代码与操作' }
        ],
        hiddenName1: true,
        hiddenName2: true,
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        TabCur: 0,
        scrollLeft: 0,
        userInfo: {},
        detailList:{},
        detailImageList:[],
        urlList: [
          { imagePath: 'https://6d79-mywxapp-eafa79-1255469223.tcb.qcloud.la/01.jpg' },
          { imagePath: 'https://6d79-mywxapp-eafa79-1255469223.tcb.qcloud.la/02.jpg' },
          { imagePath: 'https://6d79-mywxapp-eafa79-1255469223.tcb.qcloud.la/03.jpg' },
          { imagePath: 'https://6d79-mywxapp-eafa79-1255469223.tcb.qcloud.la/04.jpg' },
          { imagePath: 'https://6d79-mywxapp-eafa79-1255469223.tcb.qcloud.la/05.jpg' },
          { imagePath: 'https://6d79-mywxapp-eafa79-1255469223.tcb.qcloud.la/06.jpg' }
        ],
        holdList: [],
        richText: ''  
    },
  onLoad: function (options) {
    if (options.isshare == 1) {
      console.log('是分享进入');
      this.setData({
        isshare: options.isshare
      })
    }
    var time = util.formatDate(new Date())
    this.setData({
      strategyId:options.id,
      time: time,
      
    })

    var _this = this;
    //2、开始查询数据了
    db.collection('operation').where({
      id: this.data.strategyId
    }).get({
      //如果查询成功的话
      success: res => {
        //这一步很重要，赋值，没有这一步的话，前台就不会显示值
        this.setData({
          holdList: res.data
        })
      }
    })

    db.collection('detail').where({
      id: this.data.strategyId
    }).get({
      //如果查询成功的话
      success: res => {
        //这一步很重要，赋值，没有这一步的话，前台就不会显示值
        this.setData({
          detailList: res.data,
          detailImageList: [res.data[0].detailimage1, res.data[0].detailimage2]
        })
      }
    })


  },
  //事件处理函数
  /**
   * 用户点击右上角分享 (path 中配置了参数 isshare = 1,用来 onLoad 中判断是否用户从分享出去的页面点击进入)
   */
  onShareAppMessage: function () {
    return {
      title: '我发现一个好策略',
      path: '/pages/detail/detail?isshare=1',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  /**
    * 回到首页(分享的时候)
    */
  backHome: function () {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },
  ImgPre:function(event) {
    var datasrc = event.currentTarget.dataset.src
    wx.previewImage({
      current: datasrc, // 当前显示图片的http链接
      urls: this.data.detailImageList // 需要预览的图片http链接列表
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
      

})