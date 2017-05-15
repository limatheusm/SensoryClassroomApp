
$(function() {

	/*
		Cliente solicita lista de questoes
		Servidor retorna um array de json com as perguntas (titulo e alternativas)

		Cliente envia lista de respostas do usuario
		Servidor recebe e retorna um array de resultado (true or false)
	*/

	var listOfQuestions = [];
	var answer = [];

	/* Connecting to web server */
	var socket = io('http://localhost:3000');

	// Request questions
	socket.on('connect', function(){
    console.log("conectado!");
		socket.emit('getQuestions');
	});

	// Get response of the server
	socket.on('questions', function(list){

			/*
				"list" is a json with questions (title and alternatives) returned from the server
			*/

			listOfQuestions = list;

			/* Avalia e muda de question */

			// Show the first question
			modelHTML(listOfQuestions[0]);

			var currentQuestion = 0;
			var uploadProgressBar = 0;
			var progress_bar = document.querySelector(".progress-bar");

			$('#confirm').click(function() {

			    //Executa Loop entre todas as Radio buttons com o name de value
			    $('input:radio[name=value]').each(function() {
			        //Verifica qual está selecionado
			        if ($(this).is(':checked')) {
			            answer.push($(this).val());	//captura resposta
			            $('#confirm').addClass('disabled'); //desabilita o botao para prox question
			            currentQuestion++;
			        }
			    });

					// Show the next question
			    if (currentQuestion < listOfQuestions.length){
						modelHTML(listOfQuestions[currentQuestion]);
					}
			    else { //Finalizou Quiz, solicita resultado ao servidor
						socket.emit('getResult', answer);
			    }

			    uploadProgressBar += (100 / listOfQuestions.length);
			    progress_bar.style.width = uploadProgressBar+"%";
			});
  });

	// Returned of the server
	socket.on('results', function(results){
			/*
				"results" is an array with replies (true or false) returned from the server
			*/
			var percentualResult = 0;
			for (var i = 0; i < results.length; i++) {
				if (results[i]) {
					listOfQuestions[i].answer = results[i];
					percentualResult += (100 / results.length);
				}
			}
			socket.emit('end');
			//Send data to another html page
			localStorage.setItem("result", percentualResult);
			localStorage.setItem("questions", JSON.stringify(listOfQuestions));
			location.href='result.html';
  });

//////////////// Help Functions //////////////////////////////

	// Fucao que modela as questoes no HTML
	function modelHTML(questions) {
		var title = questions.title;
		var alternatives = questions.alternatives;
		if ($('.radio').length !== 0)
			$('.radio').remove();

		$('.panel-title').html(title);
		for (var i = 0; i < alternatives.length; i++) {
			var value = i+1;
		  	$('.panel-body').append("<div class=\"radio\">\n"+
		  	       "	<label>\n"+
		  	       "		<input type=\"radio\" name=\"value\" id=\"optionsRadios"+i+1+"\" value=\""+value.toString()+"\"> "+alternatives[i]+"\n"+
		  	       "	</label>\n"+
		  	       "</div>\n");
		}
		/*Activate button when replying*/
		$('input:radio[name=value]').click(function () {
			$('#confirm').removeClass('disabled');
		});
	}

});
