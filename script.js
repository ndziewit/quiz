var startButton = document.querySelector('#start-button');
var timer = document.getElementById('timeleft');
var quizContent = document.querySelector('.quizcontent');
var score = document.getElementById('score');
var questionPrompt = quizContent.querySelectorAll('h1')[0]
var feedback = document.querySelector('.feedback');
var pastscores = document.querySelector('#highscore');
var scoreSubmit = document.querySelector('.scoresubmit')
var time = 90;
var questionNumber = 1;
var rightAnswers = 0;

// Object containing questions, choices, and correct answers
var qAndAObject = {
    question1: {
        question : "The scientific name for banana is musa sapientum, which means:",
        choices : ["Fruit of the wise men", "Long yellow fruit", "One of a bunch", "Bruises easily"],
        correct : "Fruit of the wise men"
    },
    question2: {
        question : "Where is the only place in US where bananas are grown commercially?",
        choices : ["Florida", "Texas", "California", "Hawaii"],
        correct : "Hawaii"
    },
    question3: {
        question : "Which of these atrributes about bananas is true?",
        choices : [ "They can be used to create napalm", "Their peels are poisonus in small amounts", "They are used as currency in some parts of Malaysia", "They float in water"],
        correct : "They float in water"
    },
    question4: {
        question : "The proper term for a cluster of bananas is:",
        choices : ["A hand", "A bunch", "A party", "A tally"],
        correct : "A hand"
    },
    question5: {
        question : "In the video game franchise 'Donkey Kong' where bananas are used as currency, how much is a bunch of bananas worth?",
        choices : ["5", "10", "25", "100"],
        correct : "10"
    },
    question6: {
        question : "Americans, on average, eat __ pounds of bananas a year.",
        choices : ["7", "12", "24", "27"],
        correct : "27"
    },
    question7: {
        question : "Thanks to their potassium content, bananas are slightly",
        choices : ["Psychoactive", "Analgesic", "Radioactive", "Bitter"],
        correct : "Radioactive"
    },
    question8: {
        question : "Gwen Stefani's 2004 hit 'Hollaback Girl' features the proper spelling of 'BANANAS' in the last chorus. Who was the producer of that song?",
        choices : ["Max Martin","Swizz Beats", "Timbaland", "The Neptunes"],
        correct : "The Neptunes"
    },
    question9: {
        question : "Similar to enjoying something pleasureable or taking narcotics, bananas are the only known fruit to produce this happy chemical in the brain",
        choices : ["Dopamine", "Serotonin", "Glutamate", "Cortisol"],
        correct : "Serotonin"
    },
    question10: {
        question : "If you have a headache, you can",
        choices : ["Eat a banana", "Eat a banana peel", "Rub a banana peel on your forehead", "Deeply inhale it's aroma"],
        correct : "Rub a banana peel on your forehead"
    },
    //Replaces the question with the next in line
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
    //Replaces the group of choices for the next ones in line
    getAnswers : function(a, b){
        var choices = "";
        switch(a){
            case 1:
                choices = this.question1.choices[b];
                break;
            case 2:
                choices = this.question2.choices[b];
                break;
            case 3:
                choices = this.question3.choices[b];
                break;
            case 4:
                choices = this.question4.choices[b];
                break;
            case 5:
                choices = this.question5.choices[b];
                break;
            case 6:
                choices = this.question6.choices[b];
                break;
            case 7:
                choices = this.question7.choices[b];
                break;
            case 8:
                choices = this.question8.choices[b];
                break;
            case 9:
                choices = this.question9.choices[b];
                break;
            case 10:
                choices = this.question10.choices[b];
                break;
        }
        return choices;
    },
    //Gets the correct answer for each question
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

// Creates object in local storage if there isn't one already
var scoreobject = JSON.parse(localStorage.getItem('bananaquiz'));
if (scoreobject === null){
    var scoreobject = {
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
        quizContent.innerHTML = "";
        questionPrompt = document.createElement('h2');
        questionPrompt.textContent = qAndAObject.getQuestion(questionNumber);
        quizContent.append(questionPrompt);
        // Generates potential answers within buttons
        for(var i = 0; i < 4; i++){
            answerOption = document.createElement('a');
            answerOption.classList.add('btn', 'col-md-10', 'possibleanswer');
            answerOption.setAttribute("href","#");
            answerOption.textContent = qAndAObject.getAnswers(questionNumber,i);
            quizContent.append(answerOption);
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
function incorrect(){

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

    // Adds a snarky comment if score is under a certain threshold
    var snarkycomment = ""
    if (time >= 30) {
      snarkycomment = "<h1>Harry Belafonte would be proud!</h1>";
    } else if (time <= 29) [
      snarkycomment = "<h1>You don't know bananas.</h1>"
    ]

    quizContent.innerHTML = snarkycomment + finishtext;
}

function submitScore(){
    scoreobject.user.push(document.querySelector('#playername').value);
    scoreobject.score.push(time + rightAnswers);
    localStorage.setItem('bananaquiz', JSON.stringify(scoreobject));
    highScores();
}

function highScores(){
    quizContent.innerHTML = "";
    var newScoreObj = JSON.parse(localStorage.getItem('bananaquiz'))

    // Clears quiz page and shows high scores
    if (scoreobject.user.length !== 0){
        for(var i = 0; i < newScoreObj.user.length; i++){
            var highscoreString =  newScoreObj.user[i] + " - " + newScoreObj.score[i];
            var highscoreText = document.createElement('p');
            highscoreText.innerHTML = highscoreString;
            highscoreText.classList.add('winnerscreen');
            quizContent.prepend(highscoreText);
        }
    }

    // Create buttons to replay game and clear past scores
    var newGame = document.createElement('a');
    newGame.textContent = "Start A New Game";
    newGame.setAttribute("href","#");
    newGame.classList.add('newgame');
    newGame.classList.add('btn');
    quizContent.append(newGame);
    var deleteScores = document.createElement('a');
    deleteScores.textContent = "Clear Past Scores";
    deleteScores.setAttribute("href","#");
    deleteScores.classList.add('deletescores');
    deleteScores.classList.add('btn');
    quizContent.append(deleteScores);
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

// This checks for correct answers
quizContent.addEventListener("click", function(e){
    e.preventDefault();
    // If the text in the clicked button matches with the correct answer's text, it runs the "correct()" function
    if (e.target.classList.value.indexOf('possibleanswer') !== -1 && e.target.innerHTML === qAndAObject.getCorrectAnswers(questionNumber)){
        correct();
    // If the text in the clicked button doesn't match with the correct answer's text, it runs the "incorrect()" function
    } else if (e.target.classList.value.indexOf('possibleanswer') > 0){
        incorrect();
    }
    
    // Clicking the submit score button
    if(e.target.classList.value.indexOf('scoreSubmit') !== -1){
        // Runs a prompt if nothing is inside the box
        if(document.querySelector('#playername').value.length === 0){
            alert("Hey, buddy, put your name in the box!");
        } else {
            submitScore();
        }
    }
    
    // Deletes local history on clear score button click
    if(e.target.classList.value.indexOf('deletescores') !== -1){
        scoreobject.user = [];
        scoreobject.score = [];
        localStorage.setItem('bananaquiz', JSON.stringify(scoreobject));
        highScores();
    }

    // Start a new game
    if(e.target.classList.value.indexOf('newgame') !== -1){
        window.location.reload();
    }
})
