const app = getApp();
const db = wx.cloud.database();
var util = require('../../utils/util.js');
Page({

  data: {
    usersuggestion:'',
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  res: function (e) {
    db.collection('suggestion').add({
      data: {
        usersuggestion: e.detail.value.suggestion
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 1500,
          success: function () {
            setTimeout(function () {
              //要延时执行的代码
              wx.navigateBack({
                delta: 1
              });
            }, 1500) //延迟时间
          },
        })
        
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })

  },
})