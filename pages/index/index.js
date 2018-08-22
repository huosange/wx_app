//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    items:[]
  },
  //item的点击事件监听
  onItemClick: function(event) {
  var targetUrl="/pages/image/image";
  if(event.currentTarget.dataset.url!=null){
    targetUrl=targetUrl+"?url="+event.currentTarget.dataset.url;
    console.log(targetUrl+"=================");
    wx.navigateTo({
      url: targetUrl
    })
  }
  },
  //滑动到底部的事件监听
  onReachBottom: function() {
    console.log('onLoad');
    var that=this;
    requestData(that,mCurrentPage+1);
  },
  onLoad: function() {
    console.log('onLoad')
    var that = this
    requestData(that, mCurrentPage + 1)
  }
})

/**
 * 定义几个数组用来存取item中的数据
 */
var mUrl=[];
var mDesc=[];
var mWho=[];
var mTimes=[];
var mTitles=[];

var mCurrentPage = 0;
var Constant=require('../../utils/constant.js')

/**
 * 请求数据
 */
function requestData(that, targetPage) {
  wx.showToast({
    title: '加载中',
    icon:'loading'
  })
  wx.request({
    url: Constant.GET_MEIZHI_URL+targetPage,
    header:{
      "Content-Type":"application/json"
    },
    success:function(res){
      if(res==null||res.data==null||res.data.results==null||res.data.results.length<=0){
        console.error("god bless you...");
        return;
      }

      console.log(res.data);

      for(var i=0;i<res.data.results.length;i++){
        bindData(res.data.results[i]);
      }

      //将获取的各种数据写入itemList,用于setData
      var itemList=[];
      for(var i=0;i<mUrl.length;i++){
        //封装成一个对象，装进itemList
        itemList.push({url:mUrl[i],desc:mDesc[i],who:mWho[i],time:mTimes[i],title:mTitles[i]});
      }

      that.setData({
        items:itemList,
      });

      mCurrentPage=targetPage;
      wx.hideToast();
    }
  })

/**
 * 绑定接口中返回的数据
 */
  function bindData(itemData){
    var url=itemData.url;
    var desc=itemData.desc;
    var who=itemData.who;
    var times=itemData.publishedAt.split("T")[0];

    mUrl.push(url);
    mDesc.push(desc);
    mWho.push(who);
    mTimes.push(times);
    mTitles.push("@"+who+"拍摄于"+times);

  }
}