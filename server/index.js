const ws = require('ws')
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: '192.168.0.139',
  user: 'root',
  password: 'root',
  database: 'c_chat'
});
const sql = `select * from c_chat`
connection.connect();
; ((ws) => {
  // ws:localhost:8000
  const server = new ws.Server({ port: 8000 })
  const init = () => {
    bindEvent()
  }
  function bindEvent () {
    server.on('open', handleOpen)
    server.on('close', handleClose)
    server.on('error', handleError)
    server.on('connection', handleConnection)
  }
  function handleOpen (e) {
    console.log(e);

  }
  function handleClose (e) {

  }
  function handleError (e) {

  }
  function handleConnection (ws) {
    queryMessage()
    ws.on('message', handleMessage)
  }
  function queryMessage () {
    connection.query(sql, (err, res) => {
      server.clients.forEach(c => {
        c.send(JSON.stringify(res))
      })
    })
  }
  function handleMessage (msg) {
    /**
     * 保存到数据库然后再查
     */
    let body = JSON.parse(msg)
    let insertSql = `INSERT INTO c_chat(id,dateTime,name,message) VALUES('${body.dateTime}','${body.dateTime}','${body.name}','${body.message}');`
    connection.query(insertSql)
    let sendBody = JSON.stringify(body)
    server.clients.forEach(c => {
      c.send(sendBody)
    })
  }
  init()
})(ws)