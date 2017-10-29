(() => {

	/*
		Cliente solicita lista de questoes
		Servidor retorna um array de json com as perguntas (titulo e alternativas)

		Cliente envia lista de respostas do usuario
		Servidor recebe e retorna um array de resultado (true or false)
	*/

	var listOfQuestions = []
	var answer = []

	/* Connecting to web server */
	var socket = io('http://localhost:3000')

	// Request questions
	socket.on('connect', function () {
		console.log("getQuestions: conectado!")
		socket.emit('getQuestions')
	})

	// Get response of the server
	socket.on('questions', function (list) {

		/*
			"list" is a json with questions (title and alternatives) returned from the server
		*/
		listOfQuestions = list

		/* Avalia e muda de question */
		// Show the first question
		modelHTML(listOfQuestions[0])

		var currentQuestion = 0
		var uploadProgressBar = 0
		var progress_bar = document.querySelector(".progress-bar")
		var confirm = document.getElementById('confirm')

		confirm.addEventListener('click', () => {
			//Executa Loop entre todas as Radio buttons com o name de value
			var inputs = document.getElementsByTagName('input')

			// Capturar a resposta marcada
			addActionInListOfElements(inputs, element => {
				if (element.checked) {
					answer.push(element.value) //captura resposta
					confirm.classList.add('disabled') //desabilita o botao para prox question
					currentQuestion++
				}
			})

			// Exibir proxima questao
			if (currentQuestion < listOfQuestions.length) {
				modelHTML(listOfQuestions[currentQuestion])
			}
			else {
				//Finalizou Quiz				
				localStorage.setItem("answer", answer)
				location.href = 'result.html'
			}

			// Atualiza barra de progresso
			uploadProgressBar += (100 / listOfQuestions.length)
			progress_bar.style.width = uploadProgressBar + "%"
		})
	})


	//////////////// Help Functions //////////////////////////////

	// Fucao que modela as questoes no HTML
	function modelHTML(questions) {
		var title = questions.title
		var alternatives = questions.alternatives
		var radioElement = document.getElementsByClassName('radio')

		if (radioElement.length !== 0)
			removeElement(radioElement)

		document.getElementById('title').innerHTML = title
		var value = 0
		var form = document.forms[0]
		addActionInListOfElements(alternatives, alternative => {
			value += 1
			var content = "<div class=\"radio\">\n" +
				"	<label>\n" +
				"		<input type=\"radio\" name=\"question\" id=\"optionsRadios" + value + "\" value=\"" + value.toString() + "\"> " + alternative + "\n" +
				"	</label>\n" +
				"</div>\n";
			appendElement(form, 'div', content).classList.add('radio')
		})

		/*Activate button when replying*/
		var inputs = document.getElementsByTagName('input')
		addActionInListOfElements(inputs, element => {
			element.addEventListener('click', () => {
				document.getElementById('confirm').classList.remove('disabled')
			})
		})
	}

	function removeElement(element) {
		for (var i = element.length - 1; i >= 0; i--)
			if (element[i] && element[i].parentElement)
				element[i].parentElement.removeChild(element[i])
	}

	// executa uma acao para cada elemento da lista
	function addActionInListOfElements(list, action) {
		for (var i = list.length - 1; i >= 0; i--) {
			if (list[i]) {
				action(list[i])
			}
		}
	}

	// append element child 
	function appendElement(parent, elementType, content) {
		var div = document.createElement(elementType)
		div.innerHTML = content
		parent.appendChild(div)
		return div
	}

})()
