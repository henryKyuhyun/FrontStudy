const socket = io('ws://localhost:8080');

// 주의해야하는게 server의 Message 와 동일해야한다. on, emit 잘 보자

socket.on('message', text => {
  const element = document.createElement('li');
  element.innerHTML = text;
  document.querySelector('ul').appendChild(element);
})

document.querySelector('button').onclick = () =>{
  const text = document.querySelector('input').value;
  socket.emit('message',text);  
}