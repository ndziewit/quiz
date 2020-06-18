var startButton = document.querySelector('#start-button');
var timer = document.getElementById('timeleft');
var quizFrame = document.querySelector('.quiz-frame');
var score = document.getElementById('score');
var questionPrompt = quizFrame.querySelectorAll('h1')[0]
var feedback = document.querySelector('.feedback');
var pastscores = document.querySelector('#highscore');
var scoreSubmit = document.querySelector('.scoresubmit')

// Set starting variables
var questionNumber = 1;
var time = 90;
var rightAnswers = 0;

// Create objects with questions
var qAndAObject = {
    question1: {
        question : "Choose B",
        answers : [
            "A",
            "B",
            "C",
            "D"
        ],
        correct : "B"
    },
    question2: {
        question : "Choose A",
        answers : [
            "A",
            "B",
            "C",
            "D"
        ],
        correct : "A"
    },
    question3: {
        question : "Choose D",
        answers : [
            "A",
            "B",
            "C",
            "D"
        ],
        correct : "D"
    },
    question4: {
        question : "Choose B",
        answers : [
            "A",
            "B",
            "C",
            "D"
        ],
        correct : "B"
    },
    question5: {
        question : "Choose C",
        answers : [
            "A",
            "B",
            "C",
            "D"
        ],
        correct : "C"
    },
    question6: {
        question : "Choose C",
        answers : [
            "A",
            "B",
            "C",
            "D"
        ],
        correct : "C"
    },
    question7: {
        question : "Choose C",
        answers : [
            "A",
            "B",
            "C",
            "D"
        ],
        correct : "C"
    },
    question8: {
        question : "Choose C",
        answers : [
            "A",
            "B",
            "C",
            "D"
        ],
        correct : "C"
    },
    question9: {
        question : "Choose C",
        answers : [
            "A",
            "B",
            "C",
            "D"
        ],
        correct : "C"
    },
    question10: {
        question : "Choose C",
        answers : [
            "A",
            "B",
            "C",
            "D"
        ],
        correct : "C"
    },
    getQuestion : function(x){
        var question = "";
        switch(x){
            case 1:
                question = this.question1.question;
                break;
            case 2:
                question = this.question2.question;
                break;
            case 3:
                question = this.question3.question;
                break;
            case 4:
                question = this.question4.question;
                break;
            case 5:
                question = this.question5.question;
                break;
            case 6:
                question = this.question6.question;
                break;
            case 7:
                question = this.question7.question;
                break;
            case 8:
                question = this.question8.question;
                break;
            case 9:
                question = this.question9.question;
                break;
            case 10:
                question = this.question10.question;
                break;
        }
        return question;
    },
    getAnswers : function(a, b){
        var answers = "";
        switch(a){
            case 1:
                answers = this.question1.answers[b];
                break;
            case 2:
                answers = this.question2.answers[b];
                break;
            case 3:
                answers = this.question3.answers[b];
                break;
            case 4:
                answers = this.question4.answers[b];
                break;
            case 5:
                answers = this.question5.answers[b];
                break;
            case 6:
                answers = this.question6.answers[b];
                break;
            case 7:
                answers = this.question7.answers[b];
                break;
            case 8:
                answers = this.question8.answers[b];
                break;
            case 9:
                answers = this.question9.answers[b];
                break;
            case 10:
                answers = this.question10.answers[b];
                break;
        }
        return answers;
    },
    getCorrectAnswers : function(a){
        var correctAnswers = "";
        switch(a){
            case 1:
                correctAnswers = this.question1.correct;
                break;
            case 2:
                correctAnswers = this.question2.correct;
                break;
            case 3:
                correctAnswers = this.question3.correct;
                break;
            case 4:
                correctAnswers = this.question4.correct;
                break;
            case 5:
                correctAnswers = this.question5.correct;
                break;
            case 6:
                correctAnswers = this.question6.correct;
                break;
            case 7:
                correctAnswers = this.question7.correct;
                break;
            case 8:
                correctAnswers = this.question8.correct;
                break;
            case 9:
                correctAnswers = this.question9.correct;
                break;
            case 10:
                correctAnswers = this.question10.correct;
                break;
        }
        return correctAnswers;
    }
};

// Creates object in local storage
var scoreObj = JSON.parse(localStorage.getItem('scoreObj'));
if (scoreObj === null){
    var scoreObj = {
        user : [],
        score : []
    }
}  

function startTimer(){
    // Shows time remaining
    timer.textContent = "Time Left: " + time;
    // Timer
        interval = setInterval(function() {
            if (time > 0) {
                time--
                timer.textContent = "Time Left: " + time;
              } else {
                endQuiz();
            }
        }, 1000);
}

function askQuestion(){
    // Checks to see if quiz end is reached
    if(questionNumber > 10) {
        feedback.innerHTML = "";
        endQuiz();
    } else{
        // Generates question in an H1
        startButton.style.display = "none";
        quizFrame.innerHTML = "";
        questionPrompt = document.createElement('h2');
        questionPrompt.textContent = qAndAObject.getQuestion(questionNumber);
        quizFrame.append(questionPrompt);
        // Generates potential answers within buttons
        for(var i = 0; i < 4; i++){
            answerOption = document.createElement('a');
            answerOption.classList.add('btn', 'col-md-10', 'possibleanswer');
            answerOption.setAttribute("href","#");
            answerOption.textContent = qAndAObject.getAnswers(questionNumber,i);
            quizFrame.append(answerOption);
        }
        var answerOption = document.querySelector('.possibleanswer')
    }
}

// If player answers correctly, this runs
function correct(){
    questionNumber++;
    rightAnswers++;
    feedback.innerHTML = "<h1>Good Answer!</h1>"
    askQuestion();
}

// If player answers incorrectly, this runs
function wrong(){

    time -= 10;
    timer.textContent = "Time Left: " + time;
    feedback.innerHTML = "<h1>I think you got that one wrong...</h1>"
    questionNumber++;
    askQuestion();
}

function endQuiz(){

    // Stop timer
    clearInterval(interval);

    // Create HTML output when quiz ends
    var finishtext = "<h2>You scored " + parseInt(time + rightAnswers) + "</h2>";
    finishtext += "<p>You answered  " + rightAnswers +" questions about bananas right. You may eat " + rightAnswers + " bananas.</p>";
    finishtext += "<p>Please enter your name:</p>";
    finishtext += "<input type='text' id='playername' placeholder='Ooh ooh ah ah'>";
    finishtext += "<input type='submit' value='Submit' class='scoreSubmit'>";

    var snarkycomment = ""
    if (time >= 30) {
      snarkycomment = "<h1>Harry Belafonte would be proud!</h1>";
    } else if (time <= 29) [
      snarkycomment = "<h1>You don't know bananas.</h1>"
    ]

    quizFrame.innerHTML = snarkycomment + finishtext;
}

function submitScore(){
    scoreObj.user.push(document.querySelector('#playername').value);
    scoreObj.score.push(time + rightAnswers);
    localStorage.setItem('scoreObj', JSON.stringify(scoreObj));
    highScores();
}

function highScores(){
    quizFrame.innerHTML = "";
    var newScoreObj = JSON.parse(localStorage.getItem('scoreObj'))

    // Clears quiz page and shows high scores
    if (scoreObj.user.length !== 0){
        for(var i = 0; i < newScoreObj.user.length; i++){
            var highscoreString =  newScoreObj.user[i] + " - " + newScoreObj.score[i];
            var highscoreText = document.createElement('p');
            highscoreText.innerHTML = highscoreString;
            highscoreText.classList.add('winnerscreen');
            quizFrame.prepend(highscoreText);
        }
    }

    // Create buttons to replay game and clear past scores
    var newGame = document.createElement('a');
    newGame.textContent = "Start A New Game";
    newGame.setAttribute("href","#");
    newGame.classList.add('newgame');
    newGame.classList.add('btn');
    quizFrame.append(newGame);
    var deleteScores = document.createElement('a');
    deleteScores.textContent = "Clear Past Scores";
    deleteScores.setAttribute("href","#");
    deleteScores.classList.add('deletescores');
    deleteScores.classList.add('btn');
    quizFrame.append(deleteScores);
}

pastscores.addEventListener("click",function(){
  highScores();
})

// Start quiz button
startButton.addEventListener("click", function(){
    event.preventDefault();  
    startTimer();
    askQuestion();
})

// Compares user's response with answer
quizFrame.addEventListener("click", function(e){
    e.preventDefault();
    if (e.target.classList.value.indexOf('possibleanswer') !== -1 && e.target.innerHTML === qAndAObject.getCorrectAnswers(questionNumber)){
        correct();
    } else if (e.target.classList.value.indexOf('possibleanswer') > 0){
        wrong();
    }
    
    // Submit score button click
    if(e.target.classList.value.indexOf('scoreSubmit') !== -1){
        if(document.querySelector('#playername').value.length === 0){
            alert("Hey, buddy, put your name in the box!");
        } else {
            submitScore();
        }
    }
    
    // Deletes local history on clear score button click
    if(e.target.classList.value.indexOf('deletescores') !== -1){
        scoreObj.user = [];
        scoreObj.score = [];
        localStorage.setItem('scoreObj', JSON.stringify(scoreObj));
        highScores();
    }

    // Start a new game
    if(e.target.classList.value.indexOf('newgame') !== -1){
        window.location.reload();
    }
})
