  const socket = new WebSocket('wss://eager-gazelle-plainly.ngrok-free.app');
  const input = document.getElementById("1")
  const div = document.getElementById("2")
  const input2 = document.getElementById("3")
  const b = document.getElementById("4")
  const b2 = document.getElementById("5")
  socket.onmessage = (message) => {
    let para = document.createElement("p");
    para.innerHTML = message.data;
    div.appendChild(para);
  };
  
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
