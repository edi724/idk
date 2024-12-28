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

image_file_input.addEventListener("change", async () => {
  const file = image_file_input.files[0];
  if (file) {
    const arrayBuffer = await file.arrayBuffer();

    // Create a new ArrayBuffer with length of original buffer + 1 for the '4' byte
    const newArrayBuffer = new ArrayBuffer(arrayBuffer.byteLength + 1);

    // Create a Uint8Array view for the new ArrayBuffer
    const newView = new Uint8Array(newArrayBuffer);

    // Add the byte "4" at the beginning
    newView[0] = 4;

    // Copy the original data into the new ArrayBuffer starting at index 1
    newView.set(new Uint8Array(arrayBuffer), 1);

    // Send the new ArrayBuffer with the "4" byte in front
    socket.send(newArrayBuffer);
  }
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
  if (!IDid) {
    console.log(message.data)
    localStorage.setItem("clientId", message.data);
    IDid = 1;
  }
  if(message.data[0] == "0"){
    message = message.data
    message = popString(message, 0)
    let para = document.createElement("p");
    para.innerHTML = message;
    div.appendChild(para);
  }
  else if(message.data[0] == "1"){
    message = message.data
    message = popString(message, 0)
    if(message == "success"){
      message_input.className = ""
      send_Button.className = ""
      logout_Button.className = ""
      image_file_input.className = ""
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
  console.log(Object.prototype.toString.call(message.data));
  if(message.data instanceof Blob){
    message.data.arrayBuffer().then((buffer) => {
    const uint8View = new Uint8Array(buffer);
  
    if (uint8View[0] === 4) {  // Check the identifier for an image
      console.log("Image identifier detected");
  
      const imageData = uint8View.slice(1);  // Remove the first byte (identifier)
  
      // Convert the remaining data to a Blob and display it
      const blob = new Blob([imageData], { type: 'image/png' });
      const imageUrl = URL.createObjectURL(blob);
      const img = document.createElement('img');
      img.src = imageUrl;
  
      // Append the image to the document
      div.appendChild(img);
    } else {
      console.log("Unexpected identifier:", uint8View[0]);
    }
  }).catch((err) => {
    console.error("Error converting Blob to ArrayBuffer:", err);
  });
new Blob().arrayBuffer  
}
  
};

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
