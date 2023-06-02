const socket = io('http://localhost:3000');

const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

const name = prompt("enter an username: ");
displayMessage("You joined!")

//notificate new user
socket.emit('new-user', name)

//notification user connecte
socket.on('user-connected', name => {
    displayMessage(name + " joined!");
})

//notification user disconnect
socket.on('user-disconnected', name => {
    displayMessage(name + " disconnected!");
})

//handle message from server
socket.on('chat-message', message => {
    //console.log(message);
    displayMessage(`${message.name} : ${message.message}`);
});

//display history chat
socket.on('history-chat-message', message => {
    displayMessage(message);
})

//after clicking button, add message to server
messageForm.addEventListener('submit', e => {
    e.preventDefault()
    message = messageInput.value
    if(message != ''){
        displayMessage(`You: ${message}`);
        socket.emit('send-chat-message', message)
        messageInput.value = '';
    }
    else{
        alert("please type your message before send");
    }
})

function displayMessage(message){
    const messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    messageContainer.append(messageElement);
}       