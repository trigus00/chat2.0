const socket = io();
const charForm = document.getElementById('chat-form')
const chatMessage = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name')
const userList = document.getElementById('users')

// get user and room from URL 
const {username,room} = Qs.parse(location.search,{
    ignoreQueryPrefix: true
})
// Join chat room 
socket.emit('join',{username,room})

// get room & users
socket.on('roomUsers', ({room,users})=>{
    outputRoomName(room);
    outputUsers(users);
})

//message from sever to client  
socket.on('message',message=>{
    console.log(message);
    outputMessage(message);
    //  scroll down 
    chatMessage.scrollTop = chatMessage.scrollHeight;

});

// message submit 

charForm.addEventListener('submit',(event) =>{
    event.preventDefault();

    const message = tinymce.get("msg").getContent({ format: "text" })//event.target.elements.msg.value;

    // emit a message to server 
    socket.emit('chat-message', message);
    
    //clear input 
    event.target.elements.msg.value = '';
    tinymce.activeEditor.setContent('');
    event.target.elements.msg.focus();

})
// output message 
function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `  <p class="meta" style="color:${message.color}">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div)
    
}
// room name to DOM 
function outputRoomName(room){
    roomName.innerText = room;
}

function outputUsers(users){
    console.log(users)
    userList.innerHTML = 
    `${users.map(user => `<li>${user.username}</li>`).join('')}
    `;
}