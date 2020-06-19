# 04 Web APIs: Code Quiz

I've created a quiz about bananas! At the intro screen you are greeted by a box containing the intro to the quiz and a button to start the quiz. At the bottom is a link to the previous scores and a timer that begins when the start button is clicked.

Clicking the "Past Scores" link clears the screen and shows you the previous games played with players names and scores. You have the option to clear the scores or start a new game which then brings you back to the intro screen and resets the timer.

Questions and answers are stored in an object and fetched with a "switch" statement. Every time an answer is selected, a new question and set of possible answers is displayed accompanied by a comment on the bottom if you got the question right or wrong. If you answer correctly, your score increases by 1. If you're wrong, 10 seconds is taken away from the timer and no points are added. The game ends when all questions are answered or the timer hits zero. Remaining time is added to the score, you are them prompted to enter your name, and then the score is saved to your local storage to keep track.

Correct answers are determined by code that compares the text content of the button pressed with the text content of the correct answer. If there is a perfect match, the game will determine the answer as correct.

A screenshot of the appliction is included in the "Assets" folder

Enjoy!