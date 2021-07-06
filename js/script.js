let correctIndex = null;

var timeEl = document.getElementById("time");
var descriptionEl = document.getElementById("description");
var choiceDescriptionEl = document.getElementById("choiceDescription")
var startButtonEl = document.getElementById("start");
var choicesEl  = document.getElementById("choices");

var question = [{
  question: "What is the full form of IP?",
  choices: ["Internet Provider", "Internet Port", "Internet Protocol"],
  answer: 0
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
  question: "What does CC mean in emails?",
  choices: ["Carbon Copy", "Creative Commons", "other"],
  answer: 2
}]; 

function playGame() {
  startButtonEl.style.display = "none";
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
      ans.textContent = ((index + 1) + ": " + choices);
      ans.setAttribute("style", "display: block; height: 40px;")
      ans.setAttribute("index", index);
      ansEl.appendChild(ans);
  })
  
  correctIndex = randomQuestion.answer;
}


function countdown() {
    var timeLeft = 60;
        timeEl.textContent = 'Time: ' + timeLeft;

    var timeInterval = setInterval(function () {
        if (timeLeft > 1) {
            timeEl.textContent = 'Time: ' + timeLeft;
            timeLeft--;
        } else {
            timeEl.textContent = 'Opps, out of time!';
            clearInterval(timeInterval);
        }
    } , 1000)
};

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
            runQuestion();
        }
      }
    }
)};

RunGame();
