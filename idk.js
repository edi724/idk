  const socket = new WebSocket('ws://localhost:8080');
  const input = document.getElementById("1")
  const p = document.getElementById("2")
  socket.onmessage = (message) => p.innerHTML= message.data;
 function send_message(){
    socket.send(input.value)
  }
