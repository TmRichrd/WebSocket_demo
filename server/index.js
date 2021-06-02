const ws = require('ws')
const mysql = require('mysql');
const snowflake = require('node-snowflake').Snowflake;
const connection = mysql.createConnection({
  host: '192.168.0.139',
  user: 'root',
  password: 'root',
  database: 'c_chat'
});
const express = require('express')
const md5 = require('md5')
const app = express()
const bodyParser = require('body-parser')
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Content-type');
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
  res.header('Access-Control-Max-Age', 1728000);//预请求缓存20天
  next();
});
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/web/register', (req, res) => {
  let { username, password, email } = req.body
  let pwd = md5(md5(password))
  let avatar = ''
  var id = snowflake.nextId();
  let sql = `INSERT INTO c_user(id,username,password,email,avatar) VALUES('${id}','${username}','${pwd}','${email}','${avatar}')`
  connection.query(sql, (err, r) => {
    console.log(err);
    if (err) return res.send({
      code: 400,
      msg: "注册失败，请稍后重试"
    })
    res.send({
      code: 200,
      msg: "注册成功"
    })
  })
})
app.get('/', (req, res) => {
  res.send('hi')
})
const server = app.listen(3000, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Example app listening at ${host}`)
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