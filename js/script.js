var timeEl = document.getElementById("time");
var descriptionEl = document.getElementById("description");
var choiceDescriptionEl = document.getElementById("choiceDescription")
var startButtonEl = document.getElementById("start");
var choicesEl  = document.getElementById("choices");

let correctIndex = null;
let score = 0;
let timeRemaining = 0;

var question = [{
  question: "What is the full form of IP?",
  choices: ["Internet Provider", "Internet Port", "Internet Protocol"],
  answer: 2
}, {
  question: "Who is the founder of Microsoft?",
  choices: ["Bill Gates", "Steve Jobs", "Steve Wozniak"],
  answer: 0
}, {
  question: "1 byte = ?",
  choices: ["8 bits", "64 bits", "1024 bits"],
  answer: 0
}, {
  question: "The C programming language was developed by?",
  choices: ["Brendan Eich", "Dennis Ritchie", "Guido van Rossum"],
  answer: 1
}, {
  question: "What is the correct abbreviation for Java Script?",
  choices: ["JaSc", "Java", "JS"],
  answer: 2
}]; 

function playGame() {
  startButtonEl.style.display = "none";
  startTimer(60);
  runQuestion();
}

function pullQuestion () {
  var randomIndex = Math.floor(Math.random() * question.length)
  var randomQuestion = question[randomIndex];
  question.splice(randomIndex, 1);
  return randomQuestion;  
}

function runQuestion() {
  var randomQuestion = pullQuestion();
  if (randomQuestion === undefined) {
      stopGame();
      return;
  }
  
  var questionEl = document.getElementById("description");
  questionEl.textContent = randomQuestion.question;
  
   var ansEl = document.getElementById("choiceDescription");
   ansEl.textContent = "";
  
  randomQuestion.choices.forEach((choices, index) => {
      var ans = document.createElement("button");
      ans.textContent = (choices);
      ans.setAttribute("style", "display: block; height: 50px;")
      ans.setAttribute("index", index);
      ansEl.appendChild(ans);
  })
  
  correctIndex = randomQuestion.answer;
}

function startTimer (durationInSeconds) {

  timeRemaining = durationInSeconds;
  countdown = setInterval(function () {
      if (timeRemaining > 1) {
          updateTimer();
          timeRemaining--;
      } else if (timeRemaining === 1) {
          updateTimer();
          timeRemaining--;
      } else {
          timeEl.textContent = "All out of time!";
          stopGame();
          clearInterval(countdown);
      }
  }, 1000);
}

function updateTimer (wrongAnswer = false) {

  if (timeRemaining === 0) {
      clearInterval(countdown);
      timeEl.textContent = `All out of time!`;
      stopGame();
      return;
  }
  timeEl.textContent = `Seconds remaining: ${timeRemaining}`;

  if (wrongAnswer) {
      timeEl.setAttribute("style", "color: red;");
  } else {
      timeEl.setAttribute("style", "color: orange;");
  }
}

function changeScore(value) {
  score = score + value;
  if (score < 0) {
      score = 0;
  }
}

function stopGame() {

  clearInterval(countdown);

  choiceDescriptionEl.textContent = "";
  descriptionEl.setAttribute("style", "font-size: 40px")
  descriptionEl.textContent = "Woohoo, you finished!";

  var thanksMessageEl = document.createElement("h3");
  thanksMessageEl.setAttribute("id", "final-score")
  thanksMessageEl.setAttribute("style", "color: orange; background-color: black;");
  thanksMessageEl.textContent = `Final Score: ${score}`;

  choiceDescriptionEl.appendChild(thanksMessageEl);
}


function RunGame() {
  document.getElementById("high-score").addEventListener("click", function() {
    ViewHighscores();
  });
  document.getElementById("start").addEventListener("click", function() {
    playGame();
  });
  document.getElementById("choiceDescription").addEventListener("click", function (event) {

    var element = event.target;

    if (element.matches("button")) {
        if (parseInt(element.getAttribute('index')) === correctIndex) {
            changeScore(2);
            runQuestion();
            updateTimer();
        } else {
          changeScore(-2);
          if (timeRemaining >= 10) {
            timeRemaining = timeRemaining - 10;
          } else {
            timeRemaining = 0;
          }
          updateTimer(true);
          runQuestion();
        }
      }
    }
)};

RunGame();
