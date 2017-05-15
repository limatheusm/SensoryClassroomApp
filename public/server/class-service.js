var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var fs = require("fs");

app.get('/', function(req, res){
  res.sendFile(__dirname + '/questions.json');
});

// Declaramos conexão!
io.on('connection', function(socket){

	console.log('a user connected');

	socket.on('getQuestions', function () {
    // send the list of questions
    fs.readFile( __dirname + "/" + "questions.json", 'utf8', function (err, data) {
       var list = JSON.parse( data );
       io.emit('questions', getQuestions(list));
    });
	});

	socket.on('getResult', function(answer){
    fs.readFile( __dirname + "/" + "questions.json", 'utf8', function (err, data) {
       var list = JSON.parse( data );
       io.emit('results', computeResultQuiz(list, answer));
    });
	});

	socket.on('disconnect', function(){
	   console.log('user disconnected...');
	});

  socket.on('end', function (){
    socket.disconnect(0);
  });

});

// Startamos na porta "3000" e exibimos no console!
http.listen(3000, function(){
	console.log('Start Server on Port: 3000');
});


////////////////// Help Fuctions ///////////////////

// Funcao que retorna os titulos e alternativas
function getQuestions(list) {
  var ret = [];
  for (var i = 0; i < list.length; i++) {
    ret.push({
      title: list[i].title,
      alternatives: list[i].alternatives,
      answer: undefined
    });
  }
  return ret;
}

// Funcao para computar o resultado do Quiz
function computeResultQuiz(listQuestions, answer) {

  if (listQuestions.length !== answer.length) {
    console.log('ERRO, length is not equals');
  }
  else {
    var result = [];
    for (var i = 0; i < listQuestions.length; i++) {
      result[i] = (listQuestions[i].answer === answer[i]) ? true : false;
    }
  }
  return result;
}
