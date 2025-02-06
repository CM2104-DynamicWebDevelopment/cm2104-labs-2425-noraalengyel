var express = require('express');
var app = express();

var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi({
    clientId: '04d54380020e40298bcf5073d0b386aa',
    slientSecret: '762d52c7eb764aa492cc7258d1191521'
});

//retrieve an access token
spotifyApi.clientCredentialsGrant().then( //connect to API
    function(data){ //once connected, the data variable contains the token we need
        console.log('The access token expires in ' + data.body['expires_in']); //we print out some detauls about the token to the console
        console.log('The access token is ' + data.body['access_token']);

        //save the access token so that it's used in future calls
        spotifyApi.setAccessToken(data.body['access_token']); // we set the 'access_token' for the API
    },

    function (err) {
        console.log(
            'Something went wrong when retrieving an access token',
            err.message //abort if any error is detected
        );
    }
);

async function getTracks(searchterm, res) {
    spotifyApi.searchTracks(searchterm)
        .then(function(data){
            res.send(JSON.stringify(data.body));
        }, function(err){
            console.log(err);
    });  
}

app.use(express.static('public'));

app.get('/', function(req,res){
    res.send("Hello world! by express");
});

//route for love in tracks, artists and albums
app.get('/searcLove', function(req,res){
    getTracks('love', res);
});

app.listen(8080);