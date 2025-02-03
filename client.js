const socket = new WebSocket('wss://eager-gazelle-plainly.ngrok-free.app');
const message_input = document.getElementById("1");
const send_Button = document.getElementById("2");
const div = document.getElementById("3");
const username = document.getElementById("4");
const password = document.getElementById("5");
const login_Button = document.getElementById("6");
const button = document.getElementById("7");
const error_para = document.getElementById("8");
const logout_Button = document.getElementById("9");
const image_file_input = document.getElementById("10");
const feedback_a = document.getElementById("11");
const image_file_button = document.getElementById("12");
image_file_button.addEventListener("click", async () => {
  image_file_input.click()
  image_file_input.addEventListener("change", async () =>{
    let file = image_file_input.files[0];
  if (file) {
    const arrayBuffer = await file.arrayBuffer();
    const newArrayBuffer = new ArrayBuffer(arrayBuffer.byteLength + 1);
    const newView = new Uint8Array(newArrayBuffer);
    newView[0] = 4;
    newView.set(new Uint8Array(arrayBuffer), 1);
    socket.send(newArrayBuffer);
  }
  })
});

let IDid = 0;

function popString(str, index) {
  return str.slice(0, index) + str.slice(index + 1);
}

socket.onopen = () => {
  console.log("connected");
  if (localStorage.getItem("clientId")) {
    IDid = 1;
    console.log("IDid");
    socket.send("30" + localStorage.getItem("clientId").toString());
  } else {
    console.log("not IDid");
    socket.send("31");
  }
};

socket.onmessage = (message) => {
  console.log(message.data)
  if (!IDid) {
    console.log(message.data)
    localStorage.setItem("clientId", message.data);
    IDid = 1;
  }
  if(message.data[0] == "0"){
    message = message.data
    message = popString(message, 0)
    bit = message[0]
    message = popString(message, 0)
    if(button.className == "hide"){
      let para = document.createElement("pre");
      para.innerHTML = message;
      div.appendChild(para);
      if(bit=="1"){
        let delete_button = document.createElement("button");
        delete_button.innerHTML = "X";
        delete_button.style.backgroundColor = "red";
        div.appendChild(delete_button);
      }
    }
  }
  else if(message.data[0] == "1"){
    message = message.data
    message = popString(message, 0)
    if(message == "success"){
      message_input.className = ""
      send_Button.className = ""
      logout_Button.className = ""
      image_file_button.className = ""
      feedback_a.className = ""
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
  else if(message.data instanceof Blob){
    message.data.arrayBuffer().then((buffer) => {
    const uint8View = new Uint8Array(buffer);
  
    if (uint8View[0] === 4) {  // Check the identifier for an image
      console.log("Image identifier detected");
  
      let imageData = uint8View.slice(1);  // Remove the first byte (identifier)
      image = uint8View[1].toString()
      imageData = uint8View.slice(1)
      // Convert the remaining data to a Blob and display it
      const blob = new Blob([imageData], { type: 'image/png' });
      const imageUrl = URL.createObjectURL(blob);
      let img = document.createElement('a');
      img.href = `image_viewer.html?image=${image}.png`
      img.innerHTML = "Picture"
  
      // Append the image to the document
      div.appendChild(img);
      div.appendChild(document.createElement('p'))
      socket.send("6")
    } else {
      console.log("Unexpected identifier:", uint8View[0]);
    }
  })
new Blob().arrayBuffer  
}
  
};
function delete_message(){
  
}
function send_message() {
  socket.send("2" + message_input.value);  // Text message with identifier "2"
}

function log_out() {
  socket.send("32" + localStorage.getItem("clientId").toString())
  localStorage.removeItem("clientId");
  window.location.replace("index.html");
}

function log_in() {
  if (username.value.includes("|") || password.value.includes("|")) {
    error_para.innerHTML = "username or password cannot contain '|'";
  } else {
    socket.send("0" + localStorage.getItem("clientId").toString() + "|" + username.value + "|" + password.value);
  }
}
