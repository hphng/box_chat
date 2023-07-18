
document.addEventListener("DOMContentLoaded", (event) => {
    var url = new URL(window.location.href);
    var adminID = url.searchParams.get("adminID");

    var socket = io('/adminChat');

    const messageContainer = document.getElementById('message-container');
    const messageForm = document.getElementById('send-container');
    const messageInput = document.getElementById('message-input');

    
    displayMessage('You joined!')

    const roomID = 'admin';

    //notificate new user 
    socket.emit('new-admin', {adminID, roomID});
    socket.emit('adminClient', {adminID, roomID});

    //notification user connect
    socket.on('admin-connected', name => {
        displayMessage(name + " joined!");
    })

    socket.emit('disconnected', adminID);

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
        if (message !== '') {
            displayMessage(`You: ${message}`);
            socket.emit('send-chat-message', message)
            messageInput.value = '';
        }
        else {
            alert("please type your message before send");
        }
    })

    function displayMessage(message) {
        console.log(message);
        const messageElement = document.createElement('div');
        messageElement.innerHTML = message;
        messageContainer.append(messageElement);
        window.scrollTo(0, document.body.scrollHeight);
    }
})