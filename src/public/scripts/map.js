const socket = io.connect('http://localhost:8080');

socket.on('final', function(data) {
  console.log(data);
});
