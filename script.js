
const socket = io('http://localhost:3000');

const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

//const {getData} = require("./services/formRetriveDataService");

// const username = prompt("enter an username: ");
// const email = prompt("enter email: ");
// const phone = prompt("enter phone number: ");

var roomID = prompt("enter the room id (admin): ");   

var user ={};
function getData(form) {
    var formData = new FormData(form);
  
    for (var pair of formData.entries()) {
    user[pair[0]] = pair[1];
      console.log(pair[0] + ": " + pair[1]);
    }
    
    console.log(user);
    return user;
    //console.log(Object.fromEntries(formData));
  }

  var username;


//   document.getElementById("user-information").addEventListener("submit", function (e) {
//     e.preventDefault();
//     const data = getData(e.target);
//     username = data.name;
//     console.log(username);
//   });



//notificate new user 
socket.emit('new-user', roomID)

//console.log(username);
displayMessage("You joined!")
if(roomID === ''){
    displayMessage('waiting for the admin...');
}

//notification user connect
socket.on('user-connected', name => { 
    displayMessage(name + " joined!");
})



socket.emit('join-room', roomID); 

socket.emit('disconnected', roomID);

//notification user disconnect
socket.on('user-disconnected', name => { 
    displayMessage(name + " disconnected!");
}) 


socket.on('chat-message', message => {
    console.log(message);
    displayMessage(`${message.name} : ${message.message}`);
});



 
//after clicking button, add message to server
messageForm.addEventListener('submit', e => {
    e.preventDefault();
    message = messageInput.value;
    if(message !== ''){
        displayMessage(`You: ${message}`);
        socket.emit('send-chat-message', message)
        messageInput.value = '';
    }
    else{
        alert("please type your message before send");
    }
})

function displayMessage(message){
    console.log(message);
    const messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    messageContainer.append(messageElement);
}       