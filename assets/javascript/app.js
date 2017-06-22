// I want to run my html before my javascript
$(document).ready(function() {

// Creating my variables
var timer = 10;
var right = 0;
var incorrect = 0;
var noAnswer = 0;
var questionindex = 0;
var intervalId;
var quiz = {
	question: ['Who is not a ninja turtle?', "Who is Kim Possible's best friend?", "What is Darkwing Duck's real name?", 
			'What movie are the characters from the show Talespin based on?', "Who is Scrooge McDuck's arch-rival in the show Ducktales?", 'Which is not a power on the show Captian Planet?', 
			'Who or what does Johnny Bravo love most?', 'Who is the original Red Hood?', 'How many members make up the Voltron team?', 'How many dragon balls are there?'],
	answer: ['Splinter','Ron Stoppable', 'Drake Mallard', 'The Jungle Book', 
			'Flintheart Glomgold', 'Love', 'Himself', 'The Joker','5', '7'],
	choice1: ['Donatello', 'Ron Stoppable', 'Launchpad McQuack','Aladdin','Black Pete', 
			'Earth', 'Himself', 'Dick Grayson', '6', '4'],
	choice2: ['Splinter', 'Amelia', 'Gosalyn Mallard', 'Cinderella', 'Flintheart Glomgold',
			'Fire', 'The opposite sex', 'Tim Drake', '5', '6'],
	choice3: ['Michelangelo', 'Monique', 'Fenton Crackshell','The Jungle Book', 'El Capitan', 
			'Love', 'Beer', 'Jason Todd', '4', '7'],
	choice4: ['Leonardo', 'Brick Flagg', 'Drake Mallard','Dumbo', 'Dangerous Dan', 
			'Heart', 'The gym', 'The Joker', '3', '9'],

	imageRight: ['assets/images/right1.gif', 'assets/images/right2.gif', 'assets/images/right3.gif', 'assets/images/right4.gif', 'assets/images/right5.gif', 
		'assets/images/right6.gif', 'assets/images/right7.gif', 'assets/images/right8.gif', 'assets/images/right9.gif', 'assets/images/right10.gif'],
	imageIncorrect: ['assets/images/incorrect1.gif', 'assets/images/incorrect2.gif', 'assets/images/incorrect3.gif', 'assets/images/incorrect4.gif', 'assets/images/incorrect5.gif', 
		'assets/images/incorrect6.gif', 'assets/images/incorrect7.gif', 'assets/images/incorrect8.gif', 'assets/images/incorrect9.gif', 'assets/images/incorrect10.gif'],
// Creating the function that populates my answer choice buttons
 	populate: function() {
 		
 		$("#question").html(this.question[questionindex])
		$("#choice1").html(this.choice1[questionindex]).attr("data-selection", this.choice1[questionindex]);
		$("#choice2").html(this.choice2[questionindex]).attr("data-selection", this.choice2[questionindex]);
		$("#choice3").html(this.choice3[questionindex]).attr("data-selection", this.choice3[questionindex]);
		$("#choice4").html(this.choice4[questionindex]).attr("data-selection", this.choice4[questionindex]);
		}
	};
// Creating my timer start function
	function timerStart() {
		intervalId = setInterval(decrement, 1000);
	};
// Creating the time decreasing mechanism
	function decrement() {
		timer--;
		$("#timer").html(timer + "s");
// Creating the logic for if no answer is picked in the alloted time
		if (timer === 0) {
			noAnswer++;
			timerStop();
			revealWrong();
		}
	};
// Creating the timer stop function
	function timerStop() {
		clearInterval(intervalId);
	};

// Need to hide the questions and answers and trigger the theme music.
$(".content").hide();
$(".reveal").hide();
$("#theme").trigger('load');


// Establishing the behavior of the page when the start button is clicked
	$("#start").click( function() {
		$("#start").hide();
		$(".classic-pic").hide();
		$("#timer").html(timer + "s");
// Establishing the behavior of the timer and the quiz when the start button is clicked
		setTimeout(function() {
			$(".title").hide();
			$(".content").show();
			$("#theme").trigger('play')
			quiz.populate();
			timerStart();
		}, 1000);
	});
// Creating how the choice buttons are populated
	$(".choices").click( function() {
		var selection = ($(this).attr("data-selection"));
// Creating the logic for right and wrong answers
		if (selection === quiz.answer[questionindex]) {
			right++;
			revealCorrect();
		} else {
			incorrect++;
			revealWrong();
		}
	});
// Creating the function for right answers
	function revealCorrect() {
		timerStop();
		$("#answer").html("Nice! " + quiz.answer[questionindex] + " is the correct answer!");
		$("#answer-img").html("<img src=" + quiz.imageRight[questionindex] + " width='400px'>");
		revealAnswer();
	};
// Creating the function for incorrect answers
	function revealWrong() {
		timerStop();
		$("#answer").html("Really? " + quiz.answer[questionindex] + " was the right answer.");
		$("#answer-img").html("<img src=" + quiz.imageIncorrect[questionindex] + " width='400px'>");
		revealAnswer();
	};
// Creating the function to reveal the right answer
	function revealAnswer() {
		$(".content").hide();
		$(".reveal").show();
		questionindex++
		setTimeout(nextQuestion, 3000);
	};
// Creating the function to get the to the next question
	function nextQuestion() {
		if (questionindex === quiz.question.length) {
			result();
			grades();
			
		} else {
			timer = 10;
			$(".reveal").hide();
			$("#timer").html(timer + "s");
			$(".content").show();
			quiz.populate();
			timerStart();
		}
	};
// Creating a function to provide grades at the end of the quiz
	function grades() {
		if (right >= 9) {
		 	$("#grades").html("A+");
		} 
		else if ((right <= 8) && (right >= 7)) {
			$("#grades").html("A");
		}
		else if ((right <= 6) && (right >= 5)) {
			$("#grades").html("B");
		}  
		else if (right <= 4) {
			$("#grades").html("F (90s must have been awful for you!)"); 
		} 
	};
// Creating the behavior for the page once the quiz is over
	function result() {
		$(".reveal").hide();
		$(".result").show();
		$("#correct").html("Correct Answers = " + right);
		$("#incorrect").html("Incorrect Answers = "+ incorrect);
		$("#unanswered").html("Not Answered = " + noAnswer);
		setTimeout(resetGame, 5000);
	};
// Creating the function to reset the game
	function resetGame() {
		timerStop();
		$("#theme").trigger('pause');
		timer = 10;
		questionindex = 0;
		right = 0;
		incorrect = 0;
		noAnswer = 0;
		$(".content").hide();
		$(".reveal").hide();
		$(".result").hide();
		$(".title").show();
		$("#start").show();
		$(".classic-pic").show();
		$("#theme").trigger('load');
	};

});