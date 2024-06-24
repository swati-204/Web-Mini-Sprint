// Get the modal, button, and form elements
var modal = document.getElementById("signInModal");
var btn = document.getElementById("signInButton");
var form = document.getElementById("signInForm");

// Display the modal when the button is clicked
btn.onclick = function () {
  modal.style.display = "block";
};

// Close the modal when the close button is clicked
var span = document.getElementsByClassName("close")[0];
span.onclick = function () {
  modal.style.display = "none";
};

// Close the modal when clicking outside the modal
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission

  // Get the username and password from the form
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  // Simulate authentication (replace with your actual authentication logic)
  if (username === "example" && password === "password") {
    alert("Sign-in successful!");
    modal.style.display = "none"; // Close the modal
  } else {
    alert("Invalid username or password. Please try again.");
  }
});

//questions
const questions = [
 
  {
    question:
      "Which of the following operator can be used to access value at address stored in a pointer variable?",
    answers: [
      { text: "*", correct: true },
      { text: "#", correct: false },
      { text: "&&", correct: false },
      { text: "@", correct: false },
    ],
  },
  {
    question: " What does HTML stand for?",
    answers: [
      { text: "Hyper Trainer Marking Language", correct: false },
      { text: "Hyper Text Marketing Language", correct: false },
      { text: "Hyper Text  Markup Language", correct: true },
      { text: "Hyper Trainer Markup Language", correct: false },
    ],
  },
  {
    question:
      "Which of the following is the correct way to use the standard namespace in C++?",
    answers: [
      { text: "Using namespace std;", correct: true },
      { text: "Using namespace standard;", correct: false },
      { text: "Using standard namespace;", correct: false },
      { text: "Standard namespace used;", correct: false },
    ],
  },
  {
    question: "The prototype of a function can be used to,",
    answers: [
      { text: "Define a function", correct: false },
      { text: "Declare a function", correct: true },
      { text: "Erase a function", correct: false },
      { text: "None of the above", correct: false },
    ],
  },
  {
    question: "Who is the father of C language?",
    answers: [
      { text: "Steve Jobs", correct: false },
      { text: "Dennis Ritchie", correct: true },
      { text: "James Gosling", correct: false },
      { text: "Rasmus Lerdorf", correct: false },
    ],
  },
  {
    question: "Which of the following cannot be a variable name in C?",
    answers: [
      { text: "Volatile", correct: true },
      { text: "true", correct: false },
      { text: "friend", correct: false },
      { text: "export", correct: false },
    ],
  },
  {
    question:
      "Which keyword is used to prevent any changes in the variable within a C program?",
    answers: [
      { text: "immutable", correct: false },
      { text: "mutable", correct: false },
      { text: "const", correct: true },
      { text: "volatile", correct: false },
    ],
  },
  {
    question: "Where in C the order of precedence of operators do not exist?",
    answers: [
      { text: "Within conditional statements, if, else", correct: false },
      { text: "Within while, do-while", correct: false },
      { text: "Within a macro definition", correct: false },
      { text: "None of the mentioned", correct: true },
    ],
  },
  {
    question: "Functions can return enumeration constants in C?",
    answers: [
      { text: "true", correct: true },
      { text: "false", correct: false },
      { text: "depends on the compiler", correct: false },
      { text: "depends on the standard", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + "." + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct == "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct == "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}
function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
