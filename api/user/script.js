
document.addEventListener("DOMContentLoaded", (event) => {
    var url = new URL(window.location.href);
    var userID = url.searchParams.get("userID");
    var admin = url.searchParams.get('admin');

    var socket = io('/user');

    const messageContainer = document.getElementById('message-container');
    const messageForm = document.getElementById('send-container');
    const messageInput = document.getElementById('message-input');

    // let userMessage = "";
    // if(typeof(Storage) !== "undefined"){
    //     userMessage = localStorage.getItem("userMessage");
    // }

    //notificate new user 
    socket.emit('new-user', ({userID, admin}))
    socket.emit('userClient', ({userID, admin}));

    socket.on('chat-history', arrHistoryMessage => {
        arrHistoryMessage.forEach((line) => {
            displayMessage(line);
        })
    })

    //console.log(username);
    displayMessage("You joined!")
    if(!admin){
        displayMessage('waiting for the admin...');
    }

    //notification user connect
    socket.on('user-connected', name => {
        displayMessage(name + " joined!");
    });

    socket.on('chat-message', message => {
        console.log(message);
        displayMessage(`${message.name}: ${message.message}`);
    });

    socket.on('user-disconnected', (name) => {
        displayMessage(`${name} disconnected!`)
    })


    //after clicking button, add message to server
    messageForm.addEventListener('submit', e => {
        e.preventDefault();
        message = messageInput.value;
        if (message !== '') {
            displayMessage(`You: ${message}`);
            socket.emit('send-chat-message', {message})
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
});