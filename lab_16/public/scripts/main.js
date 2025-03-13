var socket = io();

$('#form').submit(function(){
    var message = $('#input').val();
    var username = $('#username').val();
    if (message){
        socket.emit('chat message', {username:username, message:message});
        $("#input").val("");
    }
    return false;
})

socket.on('chat message', function(msg){
    $('#messages').append("<li><strong>"+msg.username+": </strong>"+msg.message+"</li>");
    window.scrollTo(0,document.body.scrollHeight);
});