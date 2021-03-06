var data = require("../../data/data.js") 
console.log(data)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude:0,
    longitude:0
  },
  bindcontroltap:function(e){
    console.log(this.timer)
    console.log(e)
    switch(e.controlId){
      case 1 : 
        this.movetoCenter();
        break;
      case 2 :
        if(this.timer){
          wx.navigateBack({
             delta:1
          })
        }else{
          wx.scanCode({
            success: () => {
              wx.showLoading({
                title: '正在获取密码',
              })
              console.log(1)
              wx.request({
                url: 'https://www.easy-mock.com/mock/5afd2adb659068782e121874/example/getName#!method=get',
                success: (res) => {
                  wx.hideLoading()
                  wx.redirectTo({
                    url: "../scanCode/scanCode?password=" + res.data.password + "&number=" + res.data.number,
                    success: () => {
                      wx.showToast({
                        title: '获取密码成功',
                        duration: 1000
                      })
                    }
                  })
                  console.log(res.data)
                }
              })
            }
          }, {
              fail: () => {

              }
            }
          )
        }
        break;
      case 3 :
        wx.navigateTo({
          url: '../warn/index',
        })
        break;
      case 5 : 
        wx.navigateTo({
          url : '../my/my'
        })
    }
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.timer = options.timer
    console.log(this.timer)
    console.log(this)
    wx.getLocation({
      success: (res) => {
        console.log(res)
        this.setData({
          longitude:res.longitude,
          latitude:res.latitude
        })
      },
    })
    wx.getSystemInfo({
      success: (res) =>{
        console.log(res)
        this.setData({
          controls:[{
            id : 1,
            iconPath:"/images/location.png",
            position:{
              width:50,
              height:50,
              left:20,
              top:res.windowHeight - 80
            },
            clickable:true
          },{
            id : 2,
            iconPath:'/images/use.png',
            position:{
              width:90,
              height:90,
              top:res.windowHeight - 100,
              left:res.windowWidth/2 - 45
            },
            clickable:true,
          },
          {
            id:3,
            iconPath:'/images/warn.png',
            position:{
              width:50,
              height:50,
              top:res.windowHeight - 80,
              left:res.windowWidth -70,
            },
            clickable:true,
          },{
              id:4,
              iconPath:'/images/marker.png',
              position:{
                width:30,
                height:40,
                top:res.windowHeight/2-45,
                left:res.windowWidth/2 - 15
              },
          },{
            id:5,
            iconPath:'/images/avatar.png',
            position:{
              width:50,
              height:50,
              top:res.windowHeight - 155,
              left:res.windowWidth - 70
            },
            clickable:true
          }]
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onready')
  },
  movetoCenter:function(){
    this.mapctx.moveToLocation()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onshow')
    this.mapctx = wx.createMapContext('ofo-map');
    this.movetoCenter();
    console.log(this.mapctx)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onhide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onunload')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})