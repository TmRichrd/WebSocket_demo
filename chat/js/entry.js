((doc, localStorage, location) => {
  const userNameEl = doc.querySelector('#username')
  const enterEl = doc.querySelector('#enter')
  const init = () => {
    bindEvent()
  }
  function bindEvent () {
    enterEl.addEventListener('click', handleEnterBtnClick, false)
  }
  function handleEnterBtnClick () {
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
  init()
})(document, localStorage, location)