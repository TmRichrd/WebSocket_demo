((doc, Socket, localStorage, location) => {
  const listEl = document.querySelector('#list')
  const messageEl = document.querySelector('#message')
  const sendEl = document.querySelector('#send')
  const ws = new Socket('ws:192.168.0.139:8000')
  let username = ''
  const init = () => {
    bindEvent()
  }
  function bindEvent () {
    sendEl.addEventListener('click', handleSendBtnClick, false)
    ws.addEventListener('open', handleOpen, false)
    ws.addEventListener('close', handleClose, false)
    ws.addEventListener('error', handleError, false)
    ws.addEventListener('message', handleMessage, false)
  }
  function handleSendBtnClick () {
    console.log('Send Message');
    const msg = messageEl.value;
    if (msg.trim().length == 0) return
    let model = {
      user: username,
      dateTime: new Date().getTime(),
      message: msg
    }
    ws.send(JSON.stringify(model))
    msg.value = ''
  }
  function handleOpen (e) {
    username = localStorage.getItem('username')
    if (!username) return location.href = "entry.html"
    console.log('WebSocket Open', e);
  }
  function handleClose (e) {
    console.log('WebSocket Close', e);

  }
  function handleError (e) {
    console.log('WebSocket Error', e);

  }
  function handleMessage (e) {
    // const msgData = JSON.parse(e.data)
    // const msgData = JSON.parse(e.data)
    listEl.appendChild(createMsg(e.data))
    console.log('首页接收返回信息', e);
  }
  function createMsg (params) {
    const { user, dateTime, message } = params
    const liEl = doc.createElement('li')
    liEl.innerHTML = `
      <p>
        <span>${user}</span>
        <i>${new Date(dateTime)}</i>
      </p>
      <p>消息:${message}</p>
    `
    return liEl
  }
  init()
})(document, WebSocket, localStorage, location)