var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

// Declaramos conexão!
io.on('connection', function(socket){

	console.log('a user connected');

	socket.on('validateCard', function(card){
	   // Avalia se o cartao eh valido
	   io.emit('resultValidation', validateCard(card));
	});

	socket.on('disconnect', function(){
	   console.log('user disconnected...');
	});

  socket.on('end', function (){		
    socket.disconnect(0);
  });

});

// Startamos na porta "3000" e exibimos no console!
http.listen(3030, function(){
	console.log('Start Server on Port: 3030');
});

/////////// HELP FUNCTIONS /////////////////

/* Retorna 1 caso seja aceito ou 0 caso seja rejeitado */
function validateCard(numCard) {
	if (numCard.length != 12) {
			return -1;
	}
	return ( (numCard[11] === '0') ? 0 : 1);
}
