//Make connection

var socket = io.connect('http://35.225.164.65:8080');

//Query DOM
// Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');

//Emit Events

btn.addEventListener('click',()=>{
    // alert('Loaded');
    socket.emit('chat',{
        message : message.value,
        handle : handle.value
    });
    
});

message.addEventListener('keypress',()=>{
    socket.emit('typing', handle.value);
});

//Listen for events
socket.on('chat',(data)=>{
    feedback.innerHTML = '';
    //message.value = '';
    output.innerHTML += '<p><strong>' + data.handle + ' : </strong>' + data.message + '</p>';
});

socket.on('typing',(data)=>{
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});

socket.on('welcome',(data)=>{
    console.log('message received', data);
});
//emit to ask join the chatroom
socket.emit('joinRoom','nba');

socket.on('newUser',(data)=>{
    console.log(data);
});

socket.on('err',(err)=>{
    console.log(err);
});

socket.on('success',(data)=>{
    console.log(data);
});

