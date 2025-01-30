var express = require('express');
var app = express();
var knockknock = require('knock-knock-jokes');

//route 1
app.get('/', function(req,res){
    res.send("Hello world! by express");
});

//route 2
app.get('/test',function(req,res){
    res.send("this is route 2");
});

//route 3
app.get('/joke', function(req,res){
    var randomJoke = knockknock();
    res.send(randomJoke);
});

//route 4
app.get('/add', function(req,res){
    var x = req.query.X;
    var y = req.query.Y;
    res.send("X + Y = " + x + " " + y); 
})
app.listen(8080);