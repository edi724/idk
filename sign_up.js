const socket = new WebSocket('wss://eager-gazelle-plainly.ngrok-free.app');
username = document.getElementById("1")
password = document.getElementById("2")
error_para = document.getElementById("3")
socket.onmessage = (message) =>{
    if(message.data == "success"){
        window.location.replace("index.html");
    }
    else{
        error_para.innerHTML = message.data
    }
}
function sign_up(){
    if(username.value.includes("|") || password.value.includes("|")){
        error_para.innerHTML = "username or password cannot contain '|'"
      }
      else{
        socket.send("1"+username.value+"|"+password.value)
      }
}
