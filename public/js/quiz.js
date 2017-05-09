$(function() {


	/*Questions*/
	
	var Question = function (title, alternatives, answer){
		if (title) this.title = title;
		if (alternatives) this.alternatives = alternatives;
		if (answer) this.answer = answer;
		this.isCorrect = false;
	}

	Question.prototype.verifyAnswer = function(option) {
		return (this.answer === option);
	};

	Question.prototype.modelHTML = function() {

		if ($('.radio').length !== 0)
			$('.radio').remove();

		$('.panel-title').html(this.title);
		for (var i = 0; i < this.alternatives.length; i++) {
			var value = i+1;
		  	$('.panel-body').append("<div class=\"radio\">\n"+
		  	       "	<label>\n"+
		  	       "		<input type=\"radio\" name=\"value\" id=\"optionsRadios"+i+1+"\" value=\""+value.toString()+"\"> "+this.alternatives[i]+"\n"+
		  	       "	</label>\n"+
		  	       "</div>\n");
		}

		/*Activate button when replying*/
		$('input:radio[name=value]').click(function () {
			$('#confirm').removeClass('disabled');			
		});
	};

	/*Create questions
		answer: representa o gabarito da questao. Deve ser
		especificado a partir de inteiros comecando pelo 
		numero 1. Por exemplo: Alternativas (1, 2, 3 , 4),
		answer = 1. Gabarito: Primeira alternativa.
	*/
	var listOfQuestions = [];
	listOfQuestions.push(
		new Question("Check the box that does not represent a source of energy.",
			["Earth power energy", "Wind power energy", "Solar energy","Nuclear energy"],
			'1')
		);
	listOfQuestions.push(
		new Question("Check the box that does not represent a fossil fuel.",
			["Natural gas", "Coal", "Petroleum","Biomass"],
			'4')
		);
	listOfQuestions.push(
		new Question("Check the box that represents renewable source of energy.",
			["Coal", "Uranium", "Petroleum","Sun"],
			'4')
		);
	listOfQuestions.push(
		new Question("About Solar Energy, check the box that correctly fills the blanks in the sentence: "+
		 "“Solar Energy is the type of energy that comes from the rising of the ____ in the form of _____ "+
		 "and _____”.",
			["sun, heat, light", "uranium, petroleum, coal", "sun, stars, moon","sun, heat, light"],
			'4')
		);
	listOfQuestions.push(
		new Question("About Hydraulic Energy, check the box that correctly fills the blanks in the "+
		"sentence: “Hydraulic Energy is the type of energy that uses the power of (a)(an)(the)______ "+
		"to produce energy like (a)(an)(the) ______or (a)(an)(the) ______”",
			["ice, snow, fog", "uranium, petroleum, coal", "moving water, wave, a water fall","sun, stars, moon"],
			'3')
		);

	/*Avalie e muda de question*/

	listOfQuestions[0].modelHTML();

	var currentQuestion = 0;
	var uploadProgressBar = 0;
	var progress_bar = document.querySelector(".progress-bar");
	/*console.log(progress_bar)*/
	$('#confirm').click(function() {
	    var value = "";	    
	    //Executa Loop entre todas as Radio buttons com o name de valor
	    $('input:radio[name=value]').each(function() {
	        //Verifica qual está selecionado
	        if ($(this).is(':checked')){
	            
	            value = $(this).val();	//captura resposta
	    
	            $('#confirm').addClass('disabled'); //desabilita o botao para prox question
	            if (value === listOfQuestions[currentQuestion].answer) 
	            	listOfQuestions[currentQuestion].isCorrect = true;	 
	            currentQuestion++;           	            
	        }
	    });

	    if (currentQuestion < listOfQuestions.length) 
	    	listOfQuestions[currentQuestion].modelHTML();
	    
	    else { //Finalizou Quiz
	    	var percentualResult = 0;
	    	for (var i = 0; i < listOfQuestions.length; i++) {
	    		
	    		if (listOfQuestions[i].isCorrect)
	    			percentualResult += (100 / listOfQuestions.length); 
	    	}
	    	//Send data to another html page
	    	localStorage.setItem("result", percentualResult);
	    	localStorage.setItem("questions", JSON.stringify(listOfQuestions));
	    	location.href='result.html';
	    }

	    /*Upload Progress Bar*/
	    uploadProgressBar += (100 / listOfQuestions.length);
	    progress_bar.style.width = uploadProgressBar+"%";
	});
});