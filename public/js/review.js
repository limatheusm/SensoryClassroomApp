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
		var currentDiv = this;
		$(btnReview[i]).click(function () {
				$(currentDiv).toggle();
		});
	});

});
