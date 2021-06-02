((doc, localStorage, location) => {
  const userNameEl = doc.querySelector('#username')
  const enterEl = doc.querySelector('#enter')
  const eyeEl = doc.querySelector('.user_eye')
  const regEl = doc.querySelector('.reg_href')
  const loginEl = doc.querySelector('.login_ref')
  const loginForm = $('.login_form')
  const regForm = $('.reg_form')
  const enterRegEl = doc.querySelector('#enterReg')
  const init = () => {
    bindEvent()
  }
  function bindEvent () {
    enterEl.addEventListener('click', handleEnterBtnClick, false)
    eyeEl.addEventListener('click', hanleShowPwd, false)
    regEl.addEventListener('click', hanleShowRegForm, false)
    loginEl.addEventListener('click', hanleShowLoginForm, false)
    enterRegEl.addEventListener('click', handleRegForm, false)
  }
  function handleEnterBtnClick () {
    loginForm.on('submit', function (e) {
      e.preventDefault();
    });
    // handleAfter()
  }
  function handleRegForm () {
    regForm.on('submit', function (e) {
      e.preventDefault();
    });
    let formData = {};
    const t = regForm.serializeArray()
    $.each(t, function () {
      formData[this.name] = this.value;
    });
    ajaxpost(registerApi,formData,(res)=>{
      console.log(res);
    },'application/json')
  }
  function hanleShowRegForm () {
    regForm.show();
    $('.login_ref').show();
    loginForm.hide();
    $('.reg_href').hide();
    $('#username').val('');
    $('#password').val('');
  }
  function hanleShowLoginForm () {
    regForm.hide();
    $('.login_ref').hide();
    loginForm.show();
    $('.reg_href').show();
    $('#regname').val('');
    $('#regmail').val('');
    $('#regpwd').val('');
  }
  function handleAfter () {
    const username = userNameEl.value.trim()
    if (username.length < 6)
    {
      alert('用户名不能小于6位')
      return
    } else
    {
      localStorage.setItem('username', username)
      location.href = "index.html"
    }
  }
  function hanleShowPwd () {
    const pwd = $('#password')
    if (pwd.val().trim() == '') return
    if (pwd.attr('type') == 'password') return pwd.attr('type', 'text');
    pwd.attr('type', 'password');
  }
  init()
})(document, localStorage, location)