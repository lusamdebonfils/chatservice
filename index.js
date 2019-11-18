var express = require('express');
var socket = require('socket.io')

//App setup
var app = express();
var server = app.listen(8080, function(){
    console.log('Listening to requests on port 8080');
});

//Static files
app.use(express.static('public'));


//socket setup
var io = socket(server);


io.on('connection',(socket) => {
    console.log('made socket connection', socket.id);
    socket.on('chat',(data)=>{
        io.sockets.emit('chat',data);
    });

    socket.on('typing',(data)=>{
        socket.broadcast.emit('typing',data);
    });

});
/*



const chatRooms = ['nba','basketball','bedminton'];

io.of('/chat').on('connection',(socket)=>{
    console.log('New user has been connected');
    socket.emit('welcome','hello players yall welcome');

    socket.on('joinRoom',(room)=>{
        if(chatRooms.includes(room)){
            socket.join(room);
            //io.of('/nba').emit('newUser', 'New Player has joined the room');
            io.of('/nba').in(room).emit('newUser', 'New Player has joined the ' + room + ' room');
            return socket.emit('success','You successful joined the '+ room + ' room')
        }else{
            return socket.emit('err','Error, No room named '+ room)
        }
        
    });
});


*/
