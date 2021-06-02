const baseUrl = 'http://192.168.0.139:3000'
function ajaxget (myurl, data, success) {
  jQuery.support.cors = true;
  NProgress.start();
  $.ajax({
    type: "get",
    url: baseUrl + myurl,
    data: data,
    async: true,
    cache: false,
    dataType: "json",
    crossDomain: true == !(document.all),
    success: function (res) {
      NProgress.done();
      if (res.code == 401)
      {
        alert('身份信息过期，请重新登录！')
        setTimeout(() => {
          window.location.href = 'entry.html'
        }, 1500);
      }
      success ? success(res) : function () { };
    },
    error: function (error) {
      NProgress.done();
      if (res.code == 401)
      {
        alert('身份信息过期，请重新登录！')
        setTimeout(() => {
          window.location.href = 'entry.html'
        }, 1500);
      }
    }
  })
}
function ajaxpost (myurl, data, success, type) {
  let obj = {}
  if (!type)
  {
    obj = data
    type = 'application/x-www-form-urlencoded;chartset=UTF-8'
  } else if (type === 'application/json')
  {
    obj = JSON.stringify(data)
  }
  NProgress.start();
  jQuery.support.cors = true;
  $.ajax({
    type: "post",
    url: baseUrl + myurl,
    data: obj,
    async: true,
    cache: false,
    contentType: type,
    responseType: 'blob' || 'arraybuffer',
    dataType: "json",
    crossDomain: true == !(document.all),
    success: function (res) {
      NProgress.done();
      success ? success(res) : function () {
        if (res.code == 401)
        {
          alert('身份信息过期，请重新登录！')
          setTimeout(() => {
            window.location.href = 'entry.html'
          }, 1500);
        }
      }
    },
    error: function (res) {
      NProgress.done();
      if (res.code == 401)
      {
        alert('身份信息过期，请重新登录！')
        setTimeout(() => {
          window.location.href = 'entry.html'
        }, 1500);
      }
    }
  })
}