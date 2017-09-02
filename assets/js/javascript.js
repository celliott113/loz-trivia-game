//==================== Global Variables ====================//
$(document).ready(function() {

    //==================== A function to create a start button ====================//
    function initialScreen() {
        startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
        $(".mainArea").html(startScreen);
    }

    initialScreen();

    //==================== A function to generateHTML ====================//
    $("body").on("click", ".start-button", function(event) {
        event.preventDefault();
        clickSound.play();
        generateHTML();

        timerWrapper();

    });

    //==================== A click function for answer choices ====================//
    $("body").on("click", ".answer", function(event) {
        clickSound.play();
        selectedAnswer = $(this).text();
        if (selectedAnswer === correctAnswers[questionCounter]) {
            clearInterval(theClock);
            generateWin();
        } else {
            clearInterval(theClock);
            generateLoss();
        }
    });

    //==================== A function for reset-button ====================//
    $("body").on("click", ".reset-button", function(event) {
        clickSound.play();
        resetGame();
    });

});
//==================== End Global Variables ====================//

//==================== A function for status bar ====================//


//==================== A function for unanswered questions ====================//
function generateLossDueToTimeOut() {
    unansweredTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/no_answer.gif'>";
    $(".mainArea").html(gameHTML);
    noChoice.play();
    setTimeout(wait, 3000);
}

//==================== A function for correctly answered questions ====================//
function generateWin() {
    correctTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
    $(".mainArea").html(gameHTML);
    rightChoice.play();
    setTimeout(wait, 4000);
}

//==================== A function for incorrectly answered questions ====================//
function generateLoss() {
    incorrectTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/wrong_answer.gif'>";
    $(".mainArea").html(gameHTML);
    wrongChoice.play();
    setTimeout(wait, 3000);
}

//==================== A function to generateHTML for the countdown timer & multiple choice placement ====================//
function generateHTML() {
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>" + answerArray[questionCounter][0] + "</p><p class='answer'>" + answerArray[questionCounter][1] + "</p><p class='answer'>" + answerArray[questionCounter][2] + "</p><p class='answer'>" + answerArray[questionCounter][3] + "</p>";
    $(".mainArea").html(gameHTML);
}

//==================== A function to determine if quiz has been completed for timer ====================//
function wait() {
    if (questionCounter < 14) {
        questionCounter++;
        generateHTML();
        counter = 30;
        timerWrapper();
    } else {
        finalScreen();
    }
}

//==================== A function for the countdown timer ====================//
function timerWrapper() {
    theClock = setInterval(thirtySeconds, 1000);

    function thirtySeconds() {
        if (counter === 0) {
            clearInterval(theClock);
            generateLossDueToTimeOut();
        }
        if (counter > 0) {
            counter--;
        }
        $(".timer").html(counter);
    }
}

//==================== A function to display quiz results & place a reset game button ====================//
function finalScreen() {
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-danger btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
    $(".mainArea").html(gameHTML);
}

//==================== A function to reset the game ====================//
function resetGame() {
    questionCounter = 0;
    correctTally = 0;
    incorrectTally = 0;
    unansweredTally = 0;
    counter = 30;

    generateHTML();
    timerWrapper();
}

//==================== Sets of variables & arrays for game content (questions & answers) ====================//
var startScreen;
var gameHTML;
var counter = 30;
var questionArray = [
    ["Link was raised in what forest under the watchful eye of the Great Deku Tree?"],
    ["Who was Link's bestfriend in the forest?"],
    ["Ganondorf was born as King of what before gaining a part of the Triforce and conquering Hyrule?"],
    ["When Link meets Zelda at Hyrule Castle as kids, Zelda gives Link a quest to find what?"],
    ["Which of the three Golden Goddesses is associated with Wisdom?"],
    ["Which of these items is NOT required in order to beat the game?"],
    ["Where did Link travel to acquire the Spiritual Stone of Fire?"],
    ["Impa saves Zelda from the evil Ganondorf. Impa is part of which race?"],
    ["To protect him from Ganondorf, the Sages held Link within the Sacred Realm for how many years?"],
    ["What item allows Link to dive deeper underwater?"],
    ["Do you remember the name of the unique blue Cucco who rarely crows?"],
    ["Which of these masks was NOT in Ocarina of Time?"],
    ["Which of these characters became the Sage of Spirit?"],
    ['What song is known as "The melody of the Royal Family"?'],
    ["How many Gold Skulltula tokens were needed to obtain the Giant's Wallet?"],
];
var answerArray = [
    ["Kakariko", "Kokiri", "Deku", "Forest Temple"],
    ["Mido", "Know-It-All Brothers", "Saria", "The Great Deku Tree"],
    ["Dark World", "Sheikah", "Gorgons", "Gerudo"],
    ["The Spiritual Stones", "The Ocarina of Time", "The Triforce", "The Master Sword"],
    ["Din", "Nayru", "Farore", "Princess Ruto"],
    ["Mirror Shield", "Light Arrows", "Biggoron Sword", "Master Sword"],
    ["Zora's Domain", "Death Mountain", "Gerudo Valley", "Hyrule Castle"],
    ["Sheikah", "Kakariko", "Hylians", "Zoras"],
    ["15", "9", "7", "5"],
    ["The Zora Scales", "The Iron Boots", "The Zora Tunic", "The Grapple Hook"],
    ["Chikee", "Cojiro", "Fado", "Cucco"],
    ["Fierce Deity's Mask", "Zora Mask", "Mask of Truth", "Keaton Mask"],
    ["Princess Ruto", "Darunia", "Nabooru", "Rauru"],
    ["Prelude of Light", "Song of Storms", "The Song of Time", "Zelda's Lullaby"],
    ["5", "10", "20", "30"],
];
var imageArray = [
    ["<img class='center-block img-right' src='assets/images/kokiri_forest.gif'>"],
    ["<img class='center-block img-right' src='assets/images/saria.gif'>"],
    ["<img class='center-block img-right' src='assets/images/ganondorf.gif'>"],
    ["<img class='center-block img-right' src='assets/images/spiritual_stones.gif'>"],
    ["<img class='center-block img-right' src='assets/images/nayru.gif'>"],
    ["<img class='center-block img-right' src='assets/images/biggoron_sword.png'>"],
    ["<img class='center-block img-right' src='assets/images/death_mountain.gif'>"],
    ["<img class='center-block img-right' src='assets/images/sheikah.gif'>"],
    ["<img class='center-block img-right' src='assets/images/sages.gif'>"],
    ["<img class='center-block img-right' src='assets/images/zora_scale.gif'>"],
    ["<img class='center-block img-right' src='assets/images/cojiro.gif'>"],
    ["<img class='center-block img-right' src='assets/images/fierce_deity_mask.gif'>"],
    ["<img class='center-block img-right' src='assets/images/nabooru.gif'>"],
    ["<img class='center-block img-right' src='assets/images/zelda_lullaby.jpg'>"],
    ["<img class='center-block img-right' src='assets/images/gold_skulltula.png'>"],
];
var correctAnswers = ["Kokiri","Saria","Gerudo","The Spiritual Stones","Nayru","Biggoron Sword","Death Mountain","Sheikah","7","The Zora Scales","Cojiro","Fierce Deity's Mask","Nabooru","Zelda's Lullaby","30"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = new Audio("assets/audio/button_click.mp3");
var noChoice = new Audio("assets/audio/no_choice.mp3");
var rightChoice = new Audio("assets/audio/right_choice.wav");
var wrongChoice = new Audio("assets/audio/wrong_choice.wav");

//==================== A function to randomize questions & answer order ====================//
