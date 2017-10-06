// Import express and path modules.
var express = require( "express");
var path = require( "path");
var app = express();

// Define the static folder.
app.use(express.static(path.join(__dirname, "./static")));
// Setup ejs templating and define the views folder.
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// Root route to render the index.ejs view.
app.get('/', function(req, res) {
 res.render("index");
})

//******Configuring Server Side Sockets*******
// we are retrieving an object given to us from the 'app.listen' method
// (we named it 'server'), and we pass the 'server' object into the socket, listen method.
var server = app.listen(8000, function() {
 console.log("listening on port 8000");
});

var count;

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) { // a single client
  console.log("Client/socket is connected!");
  console.log("Client/socket id is: ", socket.id);

  //Listining for an event happening in the client side
  socket.on("add_button", function (data){
      if(!count) {
        count = 1
      } else {
        count++;
      }

      console.log("This is data that we received", data);
      //emit response/ sending data to all the clients
      io.emit( 'server_response_add', {response: count});
  })

  //Listining for an event happening in the client side
  socket.on("reset_button", function (data){
      count = 0
      console.log("This is data that we received", data);
        // emit response/ sending data to all the clients
      io.emit( 'server_response_reset', {response: count});
  })

})
