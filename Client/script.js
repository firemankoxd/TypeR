const socket = io("http://localhost:3000")
const messageContainer = document.getElementById('message-container')
const sendContainer = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const name = prompt("What is your name ?");
// appendMessage('You joined');
socket.emit('new-user', name);

socket.on('chat-message', data => {
    console.log(data)
    appendMessage(data.name + ": " +data.message)
})

socket.on('user-joined', name => {
    appendMessage(name + " joined.");
})

socket.on('send-server-message', output => {
    appendMessage(output);
})

socket.on("connect", () => {
    console.log(socket.id)
})

sendContainer.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

function appendMessage(m) {
    const mElement = document.createElement('p')
    mElement.textContent = m
    messageContainer.append(mElement)
}
