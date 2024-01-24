const express = require('express');
const app = express();
const path = require('path');
const crypto = require('crypto');
const http = require('http');
const { Server } = require('socket.io');
const { default: mongoose } = require('mongoose');
const { saveMessages, fetchMessages } = require('./utils/messages');
const server = http.createServer(app);

const io = new Server(server);

const publicDirectory = path.join(__dirname, '../public');
app.use(express.static(publicDirectory));
app.use(express.json());


mongoose.set('strictQuery',false);  // 이거는 DeprecationWarning을 없애기 위한거임. (terminal log에 나온내용)
mongoose.connect('mongodb+srv://kyuhyun:zhtanf5246150!@cluster0.givmxp7.mongodb.net/?retryWrites=true&w=majority')
  .then(()=>console.log('db연결성공'))
  .catch(err => console.error(err));

const randomId = ()=>crypto.randomBytes(8).toString('hex');

app.post('/session',(req,res)=>{
  // let data = {
    const data= {
    username: req.body.username,
    userID: randomId()
  }
  res.send(data); //clinet 한테 response로 보내기
})

io.use((socket,next) =>{

  const username = socket.handshake.auth.username;
  const userID = socket.handshake.auth.userID;
  if(!username){
    return next(new Error('Invalid Username!!'));
  }
  socket.username = username;
  socket.id = userID;
  next();
})


let users = []; //user정보
io.on('connection', async socket => {
// get all users
  let userData = {
    username: socket.username,
    userID: socket.id
  };  //한명의 유저데이터
  users.push(userData);

  io.emit('users-data', { users }) //client로 보내기
  

  // message를 클라이언트보내온 메시지 A ===> Server ===> B
  socket.on('message-to-server', (payload) => {
    io.to(payload.to).emit('message-to-client', payload);//누구에게보내는지 Payload에 담겨있음
    saveMessages(payload);  //db에 저장
  })

  // 데이터베이스에서 메시지 가져오기
  socket.on('fetch-messages', ({ receiver }) => {
    fetchMessages(io, socket.id, receiver);
})
  // 유저가 방에서 나갔을 때
  socket.on('disconnect',()=>{
    users = users.filter(user => user.userID !== socket.id);
    // Sidebar list에서 없애기
    io.emit('users-data',{users})
    // 대화 중이라면 대화창 없애기
    io.emit('user-away',socket.id);
  })
})

const port = 4000;
server.listen(port, () =>{
  console.log('Server is up on port ' + port);
});
