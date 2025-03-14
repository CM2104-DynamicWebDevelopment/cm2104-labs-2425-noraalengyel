const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

//code to define the public 'static' folder
app.use(express.static('public'));

//set the view engine to ejs
app.set('view engine', 'ejs');

app.get('/', function(req,res){
    res.render('pages/index');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('join room', function(room){
        console.log(`User joined room: ${room}`);
        socket.join(room);
    })

    socket.on('chat message', function(data){
        const { username, message, room } = data; 
        console.log(`Message from ${username} in room ${room}: ${message}`);
        socket.to(room).emit('chat message', {usrname, message});
    });
});

http.listen(8080, function(){
    console.log('listening on *:8080');
});
