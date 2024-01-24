const http = require('http').createServer();

const io = require('socket.io') (http, {
  cors: {origin: '*'}
})
// A => server on , emit=> a or a,b  (on 을 이용해서 받아주고 emit을 이용해서 보내준다)
io.on('connection', (socket) =>{
  console.log(' a user connected')

  socket.on('message', (message) =>{
    io.emit('message', `${socket.id.substr(0,2)} said ${message}`)
  })
})
const port = 8080;

http.listen(port, () =>{
  console.log('8082 port에서 서버실행')
})