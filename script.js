var button = document.getElementById('startButton');
var score = 0;


function startQuiz(){
    button.remove(button);  
    var counter = 50;
    setInterval(function() {
      counter--;
      if (counter >= 0) {
        span = document.getElementById("timer");
        span.textContent = counter;
      }
      if (counter === 0) {
          prompt('Time is up! Your score is ' + score + '. Enter your initials to log your score.');
          clearInterval(counter);
      }
    }, 1000);
  }