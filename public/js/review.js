//(() => {})()
(() => {

	/*Limpar dados salvos no browser*/
	localStorage.clear()

	checkQuiz = () => {
		/*Avalia se o usuario ja fez o quiz*/
		if (localStorage.getItem("result"))
			location.href = 'result.html'
		else
			location.href = 'quiz.html'
	}


	var rev = document.getElementById("review")
	var listBtnReview = getChildrensByTag(rev, 'button')
	var reviewBox = document.getElementsByClassName('review-box')
	var index = 0
	addActionInListOfElements(reviewBox, box => {
		listBtnReview[index].addEventListener('click', () => {
			toggleElement(box)
		})
		index++
	})



	/** Helper **/
	function getChildrensByTag(element, tagName) {
		var childrens = element.children
		var childrensByTag = []
		for (var i = 0; i < childrens.length; i++) {
			var element = childrens[i];
			if (element) {
				if (element.tagName === tagName.toUpperCase()) {
					childrensByTag.push(element)
				}
			}

		}
		return childrensByTag
	}

	function addActionInListOfElements(list, action) {
		for (var i = 0; i < list.length; i++) {
			if (list[i]) {
				action(list[i])
			}
		}
	}

	function toggleElement(element) {
		element.style.display = (element.style.display == 'none') ? 'block' : 'none';
	}

})()