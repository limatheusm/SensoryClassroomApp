const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

http.createServer(function (request, response) {

  // Aqui fica o codigo do servidor que sera executado
  // sempre que for feito um request
  var caminho = url.parse(request.url).pathname;

  if (caminho === '/') {
    var ficheiro = path.join(__dirname, 'public', caminho, 'index.html');
  }
  else {
    var ficheiro = path.join(__dirname, 'public', caminho);
  }

  // Lendo ficheiro correspondente ao caminho/request
  fs.readFile(ficheiro, function (erro, data) {
    if (erro) {
      response.writeHead(404);
      response.end;
    }
    else {
      response.end(data);
    }
  });

}).listen(8080, 'localhost', function () {
  console.log('--- Server listening in http://127.0.0.1:8080/ ---');
});
