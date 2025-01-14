const redirectHome = document.getElementById('redirect_home')
const questionImage = document.getElementById('question-image')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const restartButton = document.getElementById('restart-btn')
const showLeaderboard = document.getElementById('leaderboard')
const gamemodeText = document.getElementById('mode-text')
const corkImage = document.getElementById('cork-flag')
const userName = document.getElementById('user-name')
const userScore = document.getElementById('user-score')
const easyMode = document.getElementById('easy-mode')
const hardMode = document.getElementById('hard-mode')
const retroMode = document.getElementById('retro-mode')
const controls = document.getElementById('controls')
const containerElem = document.getElementById('container')
const userInfo = document.getElementById('user-info')
const timerElem = document.getElementById('question-timer')
const endButton = document.getElementById('endGame')
const submitButton = document.getElementById('submit')
const wrongAnswer = document.getElementById('wrong-answer')
const roundNum = document.getElementById('game-round')
const roundAmt = document.getElementById('round')
const slideshow = document.getElementById('slideshow-container')
const scoreDisplay = document.getElementById('score')
const logoutButton = document.getElementById('logout')
const gameInstructions = document.getElementById('disclaimer')
const easyStartButton = document.getElementById('easy-start')
const retroStartButton = document.getElementById('retro-start')
let shuffledQuestions, currentQuestionIndex
var elem = document.getElementById('question-timer');
var timerReset = 20;
var timeLeft = 20;
var timer1;

showLeaderboard.addEventListener('click', showLeaderboard)
easyMode.classList.remove('hide')
easyMode.addEventListener('click', pickEasyMode)
retroMode.classList.remove('hide')
retroMode.addEventListener('click', pickRetroMode)
/*Changes index for each round and sets a new question*/ 
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    roundAmt.innerHTML = currentQuestionIndex + 1
    setNextQuestion()
})
/*When easy button is selected, it hides the main menu and opens easy mode instructions waiting for game to start*/
function pickEasyMode() {
    gameInstructions.classList.remove('hide')
    easyStartButton.classList.remove('hide')
    easyStartButton.addEventListener('click', startEasyMode)
    logoutButton.classList.add('hide')
    slideshow.classList.add('hide')
    showLeaderboard.classList.add('hide')
    gamemodeText.classList.add('hide')
    easyMode.classList.add('hide')
    hardMode.classList.add('hide')
    retroMode.classList.add('hide')
    redirectHome.classList.remove('hide')
}
/*When retro button is selected, it hides the main menu and opens retro mode instructions waiting for game to start*/
function pickRetroMode() {
    gameInstructions.classList.remove('hide')
    easyStartButton.classList.remove('hide')
    easyStartButton.addEventListener('click', startRetroMode)
    logoutButton.classList.add('hide')
    slideshow.classList.add('hide')
    showLeaderboard.classList.add('hide')
    gamemodeText.classList.add('hide')
    easyMode.classList.add('hide')
    hardMode.classList.add('hide')
    retroMode.classList.add('hide')
    redirectHome.classList.remove('hide')
}

/*When start button is clicked, easy mode begins and the timer starts */
function startEasyMode(){
    gameInstructions.classList.add('hide')
    document.getElementById('endGame').setAttribute('onclick', "easygameEnd()")
    endButton.classList.remove('hide')
    userScore.classList.remove('hide')
    logoutButton.classList.remove('hide')
    roundNum.classList.remove('hide')
    redirectHome.classList.remove('hide')
    elem.innerHTML = timerReset + " seconds remaining"
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    scoreElem.innerHTML = 0;
    setNextQuestion()
}
/*When start button is clicked, retro mode begins and the timer starts */
function startRetroMode() {
    gameInstructions.classList.add('hide')
    document.getElementById('endGame').setAttribute('onclick', "retrogameEnd()")
    endButton.classList.remove('hide')
    slideshow.classList.add('hide')
    redirectHome.classList.remove('hide')
    document.body.style.backgroundImage = "url('/static/images/pages/corkAerialRetro.jpg')";
    containerElem.style.backgroundColor = "#d8c788d1";
    timerElem.style.backgroundColor = " #B4B990";
    userScore.classList.remove('hide')
    roundNum.classList.remove('hide')
    logoutButton.classList.remove('hide')
    elem.innerHTML = timerReset + " seconds remaining"
    shuffledQuestions = retroquestions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    scoreElem.innerHTML = 0;
    setNextRetroQuestion()
}
/*This function is for selecting random images from the question arrays */
function shuffleArray(questions) {
    for (var i = questions.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * i);
        var temp = questions[i];
        questions[i] = questions[j];
        questions[j] = temp;
    }
    return questions;
}
/*If game is after finishing round 5, the game ends. Otherwise a new question displays and the timer resets*/
function setNextQuestion() {
    timeLeft = timerReset;
    resetTimer()
    if (currentQuestionIndex > 5) {
        easygameEnd()
    }
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
    nextButton.addEventListener('click', restart())
}
/*If game is after finishing round 5, the game ends. Otherwise a new question displays and the timer resets*/
function setNextRetroQuestion() {
    timeLeft = timerReset;
    if (currentQuestionIndex > 5) {
        retrogameEnd()
    }
    resetState()
    showRetroQuestion(shuffledQuestions[currentQuestionIndex])
    nextButton.addEventListener('click', restart())
}
/*It shows the question image with four possible answers, if a button is selected it goes to the selectAnswer function*/
function showQuestion(question) {
    resetTimer()
    nextButton.classList.add('hide')
    logoutButton.classList.add('hide')
    questionElement.innerText = question.question
    questionImage.src = question.image
    questionImage.style.height = '250px';
    questionImage.style.width = '100%';
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}
/*It shows the question image with four possible answers, if a button is selected it goes to the selectAnswer function*/
function showRetroQuestion(question) {
    resetTimer()
    nextButton.classList.add('hide')
    logoutButton.classList.add('hide')
    questionElement.innerText = question.question
    questionImage.src = question.image
    questionImage.style.height = '250px';
    questionImage.style.width = '100%';
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}
/*Resets the question countdown timer to 20 seconds*/
function resetTimer() {
    timeLeft = timerReset;
    countdown()
}

/*Hides the answers if the wrong answer is selected */
function restart() {
    timer1 = setInterval(countdown, 900)
    answerButtonsElement.classList.remove('hide')
    wrongAnswer.classList.add('hide')
}

/*If correct answer is selected the score is calculated, if its incorrect then the answers are hidden */
function selectAnswer(e) {
    clearInterval(timer1);
    nextButton.classList.remove()
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    selectedButton.disabled = true;
    if (selectedButton){
        if (correct) {
            calculateScore()
        }
        else{
            answerButtonsElement.classList.add('hide')
            wrongAnswer.classList.remove('hide')
            wrongAnswer.innerHTML = "That answer was incorrect, better luck next time!"
        }
    }
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    }
    redirectHome.classList.remove('hide')
    document.getElementById("endGame").style.display="block";

}
/*Timer countdown function */
function countdown() {
    elem.innerHTML = timeLeft + ' seconds remaining';
    if (timeLeft == 0) {
        clearInterval(timer1)
        nextButton.classList.remove('hide')
    }
    else {
        elem.innerHTML = timeLeft + ' seconds remaining';
        timeLeft--;
    }
}

/*Resets the answers correct or incorrect from the array */
function resetState() {
    clearStatusClass(document.body)
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

/*If the button selected is correct it joins the correct class, otherwise it joins the wrong class*/
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

/*Remove answers classes */
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

/*Score system for selecting correct answer*/
var roundScore = 0;
var endScore = 0;
var scoreElem = document.getElementById('new-score');
function calculateScore() {
    if(timeLeft >= 18){
        roundScore += 150;
    }
    else if(timeLeft >= 15 && timeLeft < 18){
        roundScore += 100;
    }
    else if(timeLeft > 0 && timeLeft < 15){
        roundScore += (100/(20 - timeLeft)) >> 0;
    }
    else{
        roundScore += 0;
    }
    scoreElem.innerHTML = roundScore;
    endScore = roundScore;
}

/*Finish the retro game mode and display submit highscore to leaderboard */
function retrogameEnd() {
    questionContainerElement.classList.add('hide')
    userInfo.classList.add('hide')
    
    var retroHighScore = endScore;
    document.getElementById("id_high_score").value = endScore+1;
    //Variable for leaderboard 
    document.getElementById("scoreform").style.display = "block";
    document.getElementById("id_high_score").value = retroHighScore;
    submitButton.classList.remove('hide')
    roundNum.classList.add('hide')
    logoutButton.classList.add('hide')
}

/*Finish the easy game mode and display submit highscore to leaderboard */
function easygameEnd() {
    questionContainerElement.classList.add('hide')
    userInfo.classList.add('hide')
    var easyHighScore = endScore;
    document.getElementById("id_high_score").value = endScore+1;
    //Variable for leaderboard 
    document.getElementById("scoreform").style.display = "block";
    document.getElementById("id_high_score").value = easyHighScore;
    submitButton.classList.remove('hide')
    roundNum.classList.add('hide')
    logoutButton.classList.add('hide')

}

//PAGE LOADING INSTRUCTIONS
window.onload = function(){
    document.getElementById("endGame").style.display="none";
    var form = document.getElementById("scoreform");
    form.elements[1].readOnly = true;
}
var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 6000); // Change image every 2 seconds
}
function plusSlides(n) {
    showSlides(slideIndex += n);
  }
// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
  }
const questions = [
    {
        question: 'Where is this?',
        image: '/media/easy/UCC.jpg',
        answers: [
            { text: 'Shandon Street', notcorrect: false },
            { text: 'Franciscan Well', notcorrect: false },
            { text: 'University College Cork', correct: true },
            { text: 'Cork City Hall', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/easy/douglas.jpg',
        answers: [
            { text: 'Douglas', correct: true },
            { text: 'Blackpool', notcorrect: false },
            { text: 'Mayfield', notcorrect: false },
            { text: 'Mallow', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/easy/patricksStreet.jpg',
        answers: [
            { text: 'South Mall', notcorrect: false },
            { text: 'College Road', notcorrect: false },
            { text: 'Patrick Street', correct: true },
            { text: 'North Cathedral', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/easy/shandonBells.jpg',
        answers: [
            { text: "Saint Fin Barre's", notcorrect: false },
            { text: 'Shandon Bells', correct: true },
            { text: 'Holy Trinity', notcorrect: false },
            { text: 'North Cathedral', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/easy/knocka.png',
        answers: [
            { text: 'Farrenree', notcorrect: false },
            { text: 'Mahon Point', notcorrect: false },
            { text: 'Wilton', notcorrect: false },
            { text: 'Knockanaheeny', correct: true }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/easy/fitzgeraldsPark.jpg',
        answers: [
            { text: 'Bishopstown Playground', notcorrect: false },
            { text: 'Ballincollig Park', notcorrect: false },
            { text: 'Tramore Valley Park', notcorrect: false },
            { text: 'Fizgeralds Park', correct: true }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/easy/patrickshill.jpg',
        answers: [
            { text: 'Strawberry Hill', notcorrect: false },
            { text: 'Shandon Street', notcorrect: false },
            { text: 'Patricks Hill', correct: true },
            { text: 'Dublin Hill', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/easy/cobh.jpg',
        answers: [
            { text: 'Kinsale', notcorrect: false },
            { text: 'Cork Docklands', notcorrect: false },
            { text: 'Cobh', correct: true },
            { text: 'Youghal', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/easy/blackpool.jpg',
        answers: [
            { text: 'Blackpool', correct: true },
            { text: 'Douglas', notcorrect: false },
            { text: 'Wilton', notcorrect: false },
            { text: 'Little Island', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/easy/oval.jpg',
        answers: [
            { text: 'Old Oak', notcorrect: false },
            { text: 'The Oval', correct: true },
            { text: 'Cissie Youngs', notcorrect: false },
            { text: 'The Rock', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/easy/baltimore.jpg',
        answers: [
            { text: 'Baltimore', correct: true },
            { text: 'Schull', notcorrect: false },
            { text: 'Roscarberry', notcorrect: false },
            { text: 'Skibbereen', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/easy/bandon.jpg',
        answers: [
            { text: 'Bandon', correct: true },
            { text: 'Dunmanway', notcorrect: false },
            { text: 'Kinsale', notcorrect: false },
            { text: 'Clonalkilty', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/easy/Bantry.jpg',
        answers: [
            { text: 'Glengarriff', notcorrect: false },
            { text: 'Schull', notcorrect: false },
            { text: 'Bantry', correct: true },
            { text: 'Drimoleague', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/easy/blarney.jpg',
        answers: [
            { text: 'Macroom', notcorrect: false },
            { text: 'Blarney', correct: true },
            { text: 'Midleton', notcorrect: false },
            { text: 'Ballincollig', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/easy/carrigaline.jpg',
        answers: [
            { text: 'Cobh', notcorrect: false },
            { text: 'Monkstown', notcorrect: false },
            { text: 'Ringaskiddy', notcorrect: false },
            { text: 'Carrigaline', correct: true }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/easy/clonakilty.jpg',
        answers: [
            { text: 'Kinsale', notcorrect: false },
            { text: 'Skibbereen', notcorrect: false },
            { text: 'Clonakilty', correct: true },
            { text: 'Cobh', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/easy/cloyne.jpg',
        answers: [
            { text: 'Ballycotton', notcorrect: false },
            { text: 'Cloyne', correct: true },
            { text: 'Killeagh', notcorrect: false },
            { text: 'Carrigtwohill', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/easy/dunmanway.jpg',
        answers: [
            { text: 'Macroom', notcorrect: false },
            { text: 'Dunmanway', correct: true },
            { text: 'Ballyvourney', notcorrect: false },
            { text: 'Goleen', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/easy/Fermoy-river.jpg',
        answers: [
            { text: 'Fermoy', correct: true },
            { text: 'Kilworth', notcorrect: false },
            { text: 'Rathcormac', notcorrect: false },
            { text: 'Glanmire', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/easy/glanmire.jpg',
        answers: [
            { text: 'Glanmire', correct: true },
            { text: 'Fermoy', notcorrect: false },
            { text: 'Rathcormac', notcorrect: false },
            { text: 'Watergrasshill', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/easy/kanturk-castle-1.jpg',
        answers: [
            { text: 'Macroom', notcorrect: false },
            { text: 'Cloyne', notcorrect: false },
            { text: 'Blarney', notcorrect: false },
            { text: 'Kanturk', correct: true }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/easy/Kilworth.JPG',
        answers: [
            { text: 'Rathcormac', notcorrect: false },
            { text: 'Watergrasshill', notcorrect: false },
            { text: 'Fermoy', notcorrect: false },
            { text: 'Kilworth', correct: true }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/easy/kinsale-colourful.jpg',
        answers: [
            { text: 'Skibbereen', notcorrect: false },
            { text: 'Courtmacsherry', notcorrect: false },
            { text: 'Cobh', notcorrect: false },
            { text: 'Kinsale', correct: true }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/easy/mallow.jpg',
        answers: [
            { text: 'Doneraile', notcorrect: false },
            { text: 'Fermoy', notcorrect: false },
            { text: 'Mallow', correct: true },
            { text: 'Blarney', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/easy/McCroom_Castle.jpg',
        answers: [
            { text: 'Mallow', notcorrect: false },
            { text: 'Kilmichael', notcorrect: false },
            { text: 'Macroom', correct: true },
            { text: 'Blarney', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/easy/midleton.jpg',
        answers: [
            { text: 'Carrigtwohill', notcorrect: false },
            { text: 'Cloyne', notcorrect: false },
            { text: 'Midleton', correct: true },
            { text: 'Castlemartyr', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/easy/roscarberry.jpg',
        answers: [
            { text: 'Skibbereen', notcorrect: false },
            { text: 'Courtmacsherry', notcorrect: false },
            { text: 'Roscarberry', correct: true },
            { text: 'Timoleague', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/easy/skibbereen.jpg',
        answers: [
            { text: 'Skibbereen', correct: true },
            { text: 'Courtmacsherry', notcorrect: false },
            { text: 'Roscarberry', noncorrect: false },
            { text: 'Timoleague', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/easy/Yougha.jpg',
        answers: [
            { text: 'Ballymacoda', notcorrect: false },
            { text: 'Ballycotton', notcorrect: false },
            { text: 'Youghal', correct: true },
            { text: 'Killeagh', notcorrect: false }
        ]
    }

]


// RETRO MODE 
const retroquestions = [
    {
        question: 'Where is this?',
        image: '/media/retro/UCC_Entrance_Retro.jpg',
        answers: [
            { text: 'Blackpool', notcorrect: false },
            { text: 'Franciscan Well', notcorrect: false },
            { text: 'North Monastery School', notcorrect: false },
            { text: 'UCC Entrance', correct: true }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/retro/Youghal_Retro.jpg',
        answers: [
            { text: 'Mallow', notcorrect: false },
            { text: 'Bandon', notcorrect: false },
            { text: 'Youghal', correct: true },
            { text: 'Douglas', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/retro/The_Lough_Retro.jpg',
        answers: [
            { text: 'The Lough', correct: true },
            { text: 'Blackrock', notcorrect: false },
            { text: 'The Lee Fields', notcorrect: false },
            { text: 'Little Island', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/retro/South_Mall_Retro.jpg',
        answers: [
            { text: 'South Mall', correct: true },
            { text: 'Dillons Cross', notcorrect: false },
            { text: 'Oliver Plunkett St', notcorrect: false },
            { text: 'Washington St', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/retro/Patricks_Hill_Retro.jpg',
        answers: [
            { text: 'Shandon St', notcorrect: false },
            { text: 'Patricks Hill', correct: true },
            { text: 'Barrack St', notcorrect: false },
            { text: 'Donovan Road', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/retro/Parnell_Place_Retro.jpg',
        answers: [
            { text: 'Mercy Hospital', notcorrect: false },
            { text: 'Cork University Hospital', notcorrect: false },
            { text: 'Mahon', notcorrect: false },
            { text: 'Parnell Place', correct: true }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/retro/Mercy_Hospital_Retro.jpg',
        answers: [
            { text: 'Mercy Hospital', correct: true },
            { text: 'Penrose Dock', notcorrect: false },
            { text: 'Firkin Crane', notcorrect: false },
            { text: 'Paul Street', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/retro/Lee_Fields_Retro.jpg',
        answers: [
            { text: 'Douglas River', notcorrect: false },
            { text: 'The Lough', notcorrect: false },
            { text: 'Lee Fields', correct: true },
            { text: 'Port of Cork', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/retro/Grande_Parade_Retro.jpg',
        answers: [
            { text: 'Merchants Quay', notcorrect: false },
            { text: 'Lapps Quay', notcorrect: false },
            { text: 'Patrick Street', notcorrect: false },
            { text: 'Grande Parade', correct: true }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/retro/Fr_Matthew_Quay.jpg',
        answers: [
            { text: 'Fr Matthew Quay', correct: true },
            { text: 'Popes Quay', notcorrect: false },
            { text: 'Lower Glamire Road', notcorrect: false },
            { text: 'Grande Parade', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/retro/Fitzgeralds_Park_Retro.jpg',
        answers: [
            { text: 'UCC Green', notcorrect: false },
            { text: 'Fitzgeralds Park', correct: true },
            { text: 'St Finbars', notcorrect: false },
            { text: 'St Annes', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/retro/Dominican_Church_Retro.jpg',
        answers: [
            { text: 'Shandon Bells', notcorrect: false },
            { text: 'North Cathedral', notcorrect: false },
            { text: 'Dominican Church', correct: true },
            { text: 'City Hall', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/retro/Brian_Boru_Bridge_Retro.jpg',
        answers: [
            { text: 'Michael Collins Bridge', notcorrect: false },
            { text: 'Brian Boru Bridge', correct: true },
            { text: 'North Gate Bridge', notcorrect: false },
            { text: 'Nano Nagle Bridge', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/retro/Blackpool_Retro.jpg',
        answers: [
            { text: 'Farrenree', notcorrect: false },
            { text: 'Blackpool', correct: true },
            { text: 'Knocknaheeny', notcorrect: false },
            { text: 'Mayfield', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/retro/Ballincollig_Retro.jpg',
        answers: [
            { text: 'Jacobs Island', notcorrect: false },
            { text: 'Shanakiel', notcorrect: false },
            { text: 'Ballincollig', correct: true },
            { text: 'Wilton', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/retro/baltimore-retro.jpg',
        answers: [
            { text: 'Kinsale', notcorrect: false },
            { text: 'Courtmacsherry', notcorrect: false },
            { text: 'Baltimore', correct: true },
            { text: 'Ballymacoda', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/retro/bandon-retro.jpeg',
        answers: [
            { text: 'Fermoy', notcorrect: false },
            { text: 'Blarney', notcorrect: false },
            { text: 'Bandon', correct: true },
            { text: 'Cobh', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/retro/bantry-retro.jpg',
        answers: [
            { text: 'Glengarriff', notcorrect: false },
            { text: 'Bantry', correct: true },
            { text: 'Ballingeary', notcorrect: false },
            { text: 'Bandon', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/retro/blarney-retro.jpg',
        answers: [
            { text: 'Macroom', notcorrect: false },
            { text: 'Fermoy', notcorrect: false },
            { text: 'Cobh', notcorrect: false },
            { text: 'Blarney', correct: true }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/retro/cobh-retro.jpeg',
        answers: [
            { text: 'Kinsale', notcorrect: false },
            { text: 'Courtmacsherry', notcorrect: false },
            { text: 'Cobh', correct: true },
            { text: 'Glanmire', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/retro/fermoy-retro.jpg',
        answers: [
            { text: 'Monkstown', notcorrect: false },
            { text: 'Mitchelstown', notcorrect: false },
            { text: 'Fermoy', correct: true },
            { text: 'Glanmire', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/retro/kanturk-retro.jpg',
        answers: [
            { text: 'Blarney', notcorrect: false },
            { text: 'Kanturk', correct: true },
            { text: 'Macroom', notcorrect: false },
            { text: 'Skibbereen', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/retro/kinsale-retro.jpg',
        answers: [
            { text: 'Cobh', notcorrect: false },
            { text: 'Kinsale', correct: true },
            { text: 'Seven Heads', notcorrect: false },
            { text: 'Carrigaline', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/media/retro/macroom-retro.jpg',
        answers: [
            { text: 'Kanturk', notcorrect: false },
            { text: 'Blarney', notcorrect: false },
            { text: 'Fermoy', notcorrect: false },
            { text: 'Macroom', correct: true }
        ]
    }
]