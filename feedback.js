const socket = new WebSocket('wss://eager-gazelle-plainly.ngrok-free.app');
const feedback_input = document.getElementById("1")
function send_feedback(){
    socket.send("5"+feedback_input.value.toString())
}