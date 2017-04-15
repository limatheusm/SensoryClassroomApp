$(function () {
	/*Limpar dados salvos no browser*/
	localStorage.clear();
	$('#btn-quiz').click(function () {
		/*Avalia se o usuario ja fez o quiz*/
		if (localStorage.getItem("result"))
			location.href = 'result.html';
		else
			location.href = 'quiz-op1.html';
	});

	var btnReview = $("#review").children("button");

	$(".review-box").each(function (i) {
		//console.log($(this).find("mulsemedia-box").children());
		var element = this.getElementsByTagName('mulsemedia-box');
		var effects = $(element).children();
		var currentDiv = this;

		$(btnReview[i]).click(function () {
						
			if (currentDiv.style.display === "block") {
				currentDiv.style.display = "none";	
			}
			else { //aCTIVE
				//runEffect('Vibration', 50, 3);
				effects.each(function () {
					runEffect(this);
				});
				currentDiv.style.display = "block";
			}
		})
	});
});