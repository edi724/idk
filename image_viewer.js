const socket = new WebSocket('wss://eager-gazelle-plainly.ngrok-free.app')
const params = new URLSearchParams(window.location.search);
const image = params.get('image');
const img = document.getElementById("1");
socket.onopen = () =>{
    socket.send(`4${image}`)
}
socket.onmessage = (message) =>{
    console.log(Object.prototype.toString.call(message.data));
    if(message.data instanceof Blob){
        message.data.arrayBuffer().then((buffer) => {
        const uint8View = new Uint8Array(buffer);
        
        if (uint8View[0] === 5) {  // Check the identifier for an image
          console.log("Image identifier detected");
          const imageData = uint8View.slice(1);  // Remove the first byte (identifier)
          const blob = new Blob([imageData], { type: 'image/png' });
          const imageUrl = URL.createObjectURL(blob);
          img.src = imageUrl
        }
        })
    new Blob().arrayBuffer
    }
}