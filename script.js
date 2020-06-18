var startButton = document.querySelector('#start-button');
var timer = document.getElementById('timeleft');
var quizFrame = document.querySelector('.quiz-frame');
var feedback = document.querySelector('.feedback');
var scoreandtime = document.querySelector('.scoreandtime');
var score = document.querySelector('#score');
var endScreen = document.querySelector('.end');
var scoreSubmit = document.querySelector('.scoresubmit')

// These are the text fields in the quiz fields
var questionPrompt = quizFrame.querySelectorAll('h1')[0]

// Set starting variables
var questionPosition = 1;
var time = 60;
var rightAnswers = 0;

// Create objects with questions
var quizObj = {
    question1: {
        question : "Click B",
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
        }
        return correctAnswers;
    }
};

// Check if there is data in local storage for the score object, if not create an empty one
var scoreObj = JSON.parse(localStorage.getItem('scoreObj'));
if (scoreObj === null){
    var scoreObj = {
        user : [],
        score : []
    }
}  

function startTimer(){
    // Output time
    timer.textContent = "Time Left: " + time;
    // Countdown time
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
    if(questionPosition > 5){
        feedback.innerHTML = "";
        endQuiz();
    } else{
        // Clear quiz frame html
        startButton.style.display = "none";
        quizFrame.innerHTML = "";

        // Set header to question
        questionPrompt = document.createElement('h2');
        questionPrompt.textContent = quizObj.getQuestion(questionPosition);
        quizFrame.append(questionPrompt);

        // Create answer options
        for(var i = 0; i < 4; i++){
            answerOption = document.createElement('a');
            answerOption.classList.add('btn', 'col-md-8', 'possibleanswer');
            answerOption.setAttribute("href","#");
            answerOption.textContent = quizObj.getAnswers(questionPosition,i);
            quizFrame.append(answerOption);
        }
        var answerOption = document.querySelector('.possibleanswer')
    }
}


function correct(){
    // Run if a correct answer is submitted
      // Increase question position
    questionPosition++;

    // Increase correct answer counter
    rightAnswers++;
    feedback.innerHTML = "<h1>Good Answer!</h1>"

    // Set next question
    askQuestion();
}

function wrong(){
    // Run if a wrong answer is submitted

    // Reduce time
    time -= 10;
    timer.textContent = time;
    feedback.innerHTML = "I think you got that one wrong..."

    // Increase question position
    questionPosition++;

    // Set next question
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
    // Add new score to score object and add to local storage
    scoreObj.user.push(document.querySelector('#playername').value);
    scoreObj.score.push(time);
    localStorage.setItem('scoreObj', JSON.stringify(scoreObj));
    getScore();
}

function getScore(){
    // Output the high scores
    // Clear HTML Frame
    quizFrame.innerHTML = "";

    // Get score object from local storage
    var newScoreObj = JSON.parse(localStorage.getItem('scoreObj'))

    // Output high scores
    if (scoreObj.user.length !== 0){
        for(var i = 0; i < newScoreObj.user.length; i++){
            var highscoreString =  newScoreObj.user[i] + " - " + newScoreObj.score[i];
            var highscoreText = document.createElement('p');
            highscoreText.innerHTML = highscoreString;
            highscoreText.classList.add('highscore-text');
            quizFrame.prepend(highscoreText);
        }
    }

    // Create button to replay game
    var replayLink = document.createElement('a');
    replayLink.textContent = "Replay";
    replayLink.setAttribute("href","#");
    replayLink.classList.add('replay-link');
    replayLink.classList.add('btn');
    quizFrame.append(replayLink);

    // If the score Object has data in it, give option to clear local storage
    if (scoreObj.user.length !== 0){
        var clearLink = document.createElement('a');
        clearLink.textContent = "Clear Scores";
        clearLink.setAttribute("href","#");
        clearLink.classList.add('clear-link');
        clearLink.classList.add('btn');
        quizFrame.append(clearLink);
    }
}

scoreandtime.addEventListener("click",function(){
  getScore();
})

// Start quiz button
startButton.addEventListener("click", function(){
    event.preventDefault();  
    startTimer();
    askQuestion();
})

quizFrame.addEventListener("click", function(e){
    e.preventDefault();
    // Get button clicks in this way because they are not present when the HTML is loaded
    // Test if the clicked answer matches the correct answer
    if (e.target.classList.value.indexOf('possibleanswer') !== -1 && e.target.innerHTML === quizObj.getCorrectAnswers(questionPosition)){
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
    
    // Clear scores button click
    if(e.target.classList.value.indexOf('clear-link') !== -1){
        scoreObj.user = [];
        scoreObj.score = [];
        localStorage.setItem('scoreObj', JSON.stringify(scoreObj));
        getScore();
    }

    // Replay button game
    if(e.target.classList.value.indexOf('replay-link') !== -1){
        window.location.reload();
    }
})

// View high score link click
