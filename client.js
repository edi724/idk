  const socket = new WebSocket('wss://22d1-2a02-2f09-3f14-fa00-bcac-4620-6508-f859.ngrok-free.app');
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
