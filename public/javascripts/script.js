// initalize the socket io() here i am just using io() becuase
//it will detect automatically the which socket is avalable

var socket = io('//localhost:3000');
socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  });

socket.on("message",inputData=>{
    
    var oldCircles = document.querySelectorAll(".old")
 
    for(let j=0; j<oldCircles.length; j++){
        oldCircles[j].style.display="none"
    }
 
    for(let i=1;i<=inputData; i++){
        $("#mainDiv").append(`<div class="circle old"></div>`)
    }
   
})
 
function sendInput(){
   
    var input =  document.getElementById("numberInput").value 
    // here we are send the message to the server and the emit is used to send and it has two parameter 1.key and 2.message
    //key is very important we need to call the key to get the data there
     socket.emit('input',input)
     
}
