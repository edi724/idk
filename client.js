  const socket = new WebSocket('wss://eager-gazelle-plainly.ngrok-free.app');
  const message_input = document.getElementById("1")
  const send_Button = document.getElementById("2")
  const div = document.getElementById("3")
  const username = document.getElementById("4")
  const password = document.getElementById("5")
  const login_Button = document.getElementById("6")
  const button = document.getElementById("7")
  const error_para = document.getElementById("8")
  function popString(str, index) {
    return str.slice(0, index) + str.slice(index + 1);
  }
  socket.onmessage = (message) => {
    message = message.data
    console.log(message)
    if(message[0] == "0"){
      message = popString(message, 0)
      let para = document.createElement("p");
      para.innerHTML = message;
      div.appendChild(para);
    }
    if(message[0] == "1"){
      message = popString(message, 0)
      if(message == "success"){
        message_input.className = ""
        send_Button.className = ""
        username.className = "hide"
        password.className = "hide"
        login_Button.className = "hide"
        button.className = "hide"
        error_para.className = "hide"
      }
      else{
        error_para.innerHTML = "invalid username or password"
      }
    }
  };
  
 function send_message(){
    socket.send(["2"+message_input.value])
  }
 function log_in(){
  socket.send("0"+username.value+"|"+password.value)
 }
