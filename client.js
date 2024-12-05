  const socket = new WebSocket('wss://192.168.1.133:8080');
  const input = document.getElementById("1")
  const p = document.getElementById("2")
  const input2 = document.getElementById("3")
  const b = document.getElementById("4")
  const b2 = document.getElementById("5")
  socket.onmessage = (message) => p.innerHTML= message.data;
 function send_message(){
    socket.send(["1"+input.value])
  }
 function enter_name(){
  console.log(input.className)
  input.className = ""
  b.className = ""
  input2.className = "hide"
  b2.className = "hide"
  socket.send("0"+input2.value)
 }
