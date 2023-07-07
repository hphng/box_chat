
var socket = io('/adminChat');

const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

const room = "test room";
socket.on("socket-id", room => {
    console.log("client side:", room);
})

displayMessage('You joined!')

const roomID = 'admin';
 
var user ={};
var username;

//notificate new user 
socket.emit('new-admin', roomID)

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
    window.scrollTo(0, document.body.scrollHeight);
}