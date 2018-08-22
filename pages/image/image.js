// pages/image/image.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:"",
    loadingText:"加载中...",
    toastText:"数据异常"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
    if (options==null||options.url==null){
      return;
    }

    that.setData({
      url:options.url
    })
  },

/**
 * 图片长按事件
 */
  onLongClick:function(event){
  var mUrl="";
  if(event.currentTarget.dataset.url!=null){
    mUrl=event.currentTarget.dataset.url;
  }

    wx.showModal({
      title: '是否保存到相册？',
      comfirmText:'保存',
      cancelText:'取消',
      success:function(res){
        if(res.confirm){
          //点击了确定
          saveImage(mUrl);
        }else{
          //点击了取消
        }
      }
    })
  }
})

var that;

/**
 * 保存图片
 */
function saveImage(mUrl){
  that.setData({
    loading:"下载中..."
  });

  wx.downloadFile({
    url:mUrl,
    type:'image',
    success:function(res){
      //下载成功后，保存到本地
      wx.saveImageToPhotosAlbum({
        filePath: res.tempFilePath,
        success:function(res){
          wx.showToast({
            title: '保存成功',
          })
        },
        fail:function(res){
          wx.showToast({
            title: '保存失败',
          })
        }
      })
    },
    fail:function(res){
      wx.showToast({
        title: '保存失败',
      })
    },
    complete:function(res){
      console.log('download complete');
    }
  })
}