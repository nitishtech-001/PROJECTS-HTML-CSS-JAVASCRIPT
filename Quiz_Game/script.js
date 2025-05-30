const questions = [
	{
		question : "Which is largest anime in the world?",
		options : [
			{text : "Shark", correct : false},
			{text: "Blue Whale", correct : true},
			{text: "Elephant", correct : false},
			{text: "Giraffe", correct : false},
		]
	},
	{
		question : "Which is Smallest continent in the world?",
		options : [
			{text : "Asia", correct : false},
			{text: "South Africa", correct : false},
			{text: "Europe", correct : false},
			{text: "Australia", correct : true},
		]
	},
	{
		question : "Which is the Largest Desert in the world?",
		options : [
			{text : "Thar", correct : false},
			{text: "Gobi", correct : false},
			{text: "Sahara", correct : true},
			{text: "Antarticca", correct : false},
		]
	},

]

const setQuestion = document.getElementById("question");
const options = document.querySelector(".options");
const nextBtn = document.getElementById("nextBtn");
let currentQuestionIndex = 0;
let score  = 0;

function startQuiz(){
	currentQuestionIndex = 0;
	score = 0;
	showQuestion();
}

function showQuestion(){
	if(!resetState()){
		return ;
	}
	let currentQuestion = questions[currentQuestionIndex];
	let questionNo = currentQuestionIndex+1;
	setQuestion.innerHTML = questionNo + ". "+currentQuestion.question;

	currentQuestion.options.forEach((option)=>{
		const button = document.createElement("button");
		button.innerHTML = option.text;
		button.classList.add("optionBtn");
		options.appendChild(button);
		// setting the correct answer
		button.dataset.correct = option.correct;
		button.addEventListener('click',checkAnswer);
	})
}

function resetState(){
	nextBtn.style.display = "none";
	while(options.firstChild){
		options.removeChild(options.firstChild);
	}
	if(currentQuestionIndex == questions.length){
		showResult();
		return false;
	}
	return true;
}

function checkAnswer(e){
	const button = e.target;
	const isCorrect = button.dataset.correct === "true";
	console.log(typeof isCorrect);
	if(isCorrect){
		button.style.backgroundColor = "#9aeabc";
		button.style.fontSize = "19px";
		score++;

	}else{
		button.style.backgroundColor = "#ff9393";
		button.style.fontSize = "19px";
	}
	Array.from(options.children).forEach((button)=>{
		if(button.dataset.correct === "true"){
			button.style.backgroundColor = "#9aeabc";
		}
		button.disabled = true;
		button.style.cursor = "no-drop";
	})
	nextBtn.style.display = "block";
	currentQuestionIndex++;
}
nextBtn.addEventListener("click",(e)=>{
	if(e.target.dataset.playAgain){
		startQuiz();
	}
	e.target.style.display = "none";
	showQuestion();
})

function showResult(){
	setQuestion.innerHTML = `You scored ${score} out of ${currentQuestionIndex}`;
	nextBtn.innerHTML = "Play Again!";
	nextBtn.dataset.playAgain = true;
	nextBtn.style.display = "block";

}

startQuiz();




