const app = getApp();
const db = wx.cloud.database();
Component({
  data: {
    aboutus: "根据<<证券投资咨询管理办法>>等相关法律法规的规定，北京量化平台科技有限公司（以下简称北京量化）无偿公开的开源股票量化策略仅供学习与交流。北京量化不提供股票策略交易和股票信号交易，不提供股票投资分析、预测、建议等证券投资咨询服务，不承诺股票策略投资收益。若您有意参照免费公开的股票量化策略进行投资，请确认您具备相应风险识别能力和风险承担能力，并且您对使用的量化策略有充分的了解。任何由于您使用公开的量化策略投资带来的资金缩水或亏损风险，北京量化不承担任何责任。",
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    motto: 'Hi 开发者4！',
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  methods: {
    //事件处理函数
    bindViewTap: function () {
      wx.navigateTo({
        url: '../logs/logs'
      })
    },
    onLoad: function () {
      // 调用云函数
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          app.globalData.OpenId = res.result.openid
          console.log('[云函数] [login] user openid: ', app.globalData.OpenId)
          db.collection('userinfo').where({
            _openid: app.globalData.OpenId
          }).get({
            success: res => {
              console.log('[数据库] [查询记录] 成功: ', res.data)
              if(res.data.length===0){
                // 获取用户信息
                wx.getSetting({
                  success: res => {
                    if (res.authSetting['scope.userInfo']) {
                      // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                      wx.getUserInfo({
                        success: res => {
                          this.setData({
                            avatarUrl: res.userInfo.avatarUrl,
                            userInfo: res.userInfo
                          })
                          //新增用户信息到数据库
                          db.collection('userinfo').add({
                            data: {
                              avatarUrl:this.data.avatarUrl,
                              userInfo:this.data.userInfo,
                            },
                            success: res => {
                              console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
                            },
                            fail: err => {
                              wx.showToast({
                                icon: 'none',
                                title: '新增记录失败'
                              })
                              console.error('[数据库] [新增记录] 失败：', err)
                            }
                          })
                        }
                      })
                    }
                  }
                })
                
              }else{
                console.log('用户信息已存在')
              }
            },
            fail: err => {
             
              console.error('[数据库] [查询记录] 失败：', err)
            }
          })
        },
        fail: err => {
          console.error('[云函数] [login] 调用失败', err)

        }
      })

      // 获取用户信息
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                this.setData({
                  avatarUrl: res.userInfo.avatarUrl,
                  userInfo: res.userInfo
                })
              }
            })
          }
        }
      })
    },

    onGetUserInfo: function (e) {
      if (!this.logged && e.detail.userInfo) {
        this.setData({
          logged: true,
          avatarUrl: e.detail.userInfo.avatarUrl,
          userInfo: e.detail.userInfo
        })
        
      }
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
          selected: 3
        })
      }
    }
  }
  
})
