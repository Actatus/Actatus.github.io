/*
 To-Do:
            Improve CSS styling
            Create better mobile styling.
            Clean up/refactor JS. Sort functions for readability.
            Improve JS documentation.
*/


document.addEventListener('DOMContentLoaded', function () {

const symbolsObject = {
    "black garden" : {
        symbolName : "black garden",
        imageLocation : "assets/vowSymbols/black_garden.png",
        alt: "A symbol of a black plateau sitting on top of a red plane. A box with a transparent center floats in the sky."
    }, "black heart" : {
        symbolName : "black heart",
        imageLocation : "assets/vowSymbols/black_heart.png",
        alt: "A dark mass sitting inside a dark horseshoe surrounded by a circle/band."
    }, "commune" : {
        symbolName : "commune",
        imageLocation : "assets/vowSymbols/commune.png",
        alt: "A dark pyramid with green rays shooting out from it."
    }, "dark" : {
        symbolName : "dark",
        imageLocation: "assets/vowSymbols/dark.png",
        alt: "A dark circle with white lines moving out from it."
    }, "drink" : {
        symbolName : "drink",
        imageLocation: "assets/vowSymbols/drink.png",
        alt: "A person with a blue liquid pouring into it."
    }, "earth" : {
        symbolName : "earth",
        imageLocation: "assets/vowSymbols/earth.png",
        alt: "A blue sphere with a green mass inside it. A white orb floats above the blue sphere."
    }, "enter" : {
        symbolName : "enter",
        imageLocation: "assets/vowSymbols/enter.png",
        alt: "A white trapezoid with a triangle sitting inside it. A red semi-circle spills out from underneath."
    }, "fleet" : {
        symbolName : "fleet",
        imageLocation: "assets/vowSymbols/fleet.png",
        alt: "5 pyramids sitting in fron of a bronze sphere."
    }, "give" : {
        symbolName : "give",
        imageLocation: "assets/vowSymbols/give.png",
        alt: "Two hands push a downard-facing pyramid away from them."
    }, "grief" : {
        symbolName : "grief",
        imageLocation: "assets/vowSymbols/grief.png",
        alt: "A white humanoid with a black sphere in its chest."
    }, "guardian" : {
        symbolName : "guardian",
        imageLocation: "assets/vowSymbols/guardian.png", 
        alt: "A person with a Destiny 2 Ghost floating above them."
    }, "hive" : {
        symbolName : "hive",
        imageLocation: "assets/vowSymbols/hive.png",
        alt: "A Destiny 2 Hive figure with 3 glowing eyes."
    }, "kill" : {
        symbolName : "kill",
        imageLocation: "assets/vowSymbols/kill.png",
        alt: "A red sphere with a white triangle piercing it."
    }, "knowledge" : {
        symbolName : "knowledge",
        imageLocation: "assets/vowSymbols/knowledge.png",
        alt : "A brain divided into multiple sections."
    }, "light" : {
        symbolName : "light",
        imageLocation: "assets/vowSymbols/light.png",
         alt: "A white sphere surrounded by multiple rays of various colors."
    }, "love" : {
        symbolName : "love",
        imageLocation: "assets/vowSymbols/love.png",
        alt : "Four hearts surrounding a spiral."
    }, "neutral" : {
        symbolName : "neutral",
        imageLocation: "assets/vowSymbols/neutral.png",
        alt : "A grey circle or band surrounding a black sphere."
    }, "plane" : {
        symbolName : "plane",
        imageLocation: "assets/vowSymbols/plane.png",
        alt : "A white half-circle with a mirrored dark half-circle under it."
    }, "pyramid" : {
        symbolName : "pyramid",
        imageLocation: "assets/vowSymbols/pyramid.png",
        alt : "A black triangle pointing upwards."
    }, "savathun" : {
        symbolName : "savathun",
        imageLocation: "assets/vowSymbols/savathun.png",
        alt : "The Witch Queen logo"
    }, "scorn" : {
        symbolName : "scorn",
        imageLocation: "assets/vowSymbols/scorn.png",
        alt : "A brown F on the right is mirrored with a reversed F on the left with a vertical line between them."
    }, "stop" : {
        symbolName : "stop",
        imageLocation: "assets/vowSymbols/stop.png",
        alt : "A red square."
    }, "tower" : {
        symbolName : "tower",
        imageLocation: "assets/vowSymbols/tower.png",
        alt : "A banner sits in front of a white sphere."
    }, "traveler" : {
        symbolName : "traveler",
        imageLocation: "assets/vowSymbols/traveler.png",
        alt : "A white sphere sits above a blue half sphere. The blue half spehre is cut off by the bottom of the symbol."
    }, "witness" : {
        symbolName : "witness",
        imageLocation: "assets/vowSymbols/witness.png",
        alt : "A dark figure/person with a tan gaseous cloud coming from their head."
    }, "worm" : {
        symbolName : "worm",
        imageLocation: "assets/vowSymbols/worm.png",
        alt : "A serpent coils around a black blob."
    }, "worship" : {
        symbolName : "worship",
        imageLocation: "assets/vowSymbols/worship.png",
        alt : "A small tan figure stretches its arms out sitting in front of a dark figure."
    }
}

let answer = '';
let prevAnswerIndex = '';
let score = 0;
let timer = 0;
let responseDifficulty = 4;

let answerButtons = document.querySelectorAll('#buttonsOutputContainer button');
const outputContainer = document.getElementById('symbolOutputContainer');
const guardianDownSound = document.getElementsByTagName('audio')[0];
const scoreOutput = document.getElementById('score');
const timerOutput = document.getElementById('timer');
const tester = document.getElementById('tester');


const shakeAnimation = [
    {transform: 'translate(5px, 5px) rotate(0deg)'},
    {transform: 'translate(-5px, -5px) rotate(-1deg)'},
    {transform: 'translate(5px, 5px) rotate(1deg)'},
    {transform: 'translate(-5px, -5px) rotate(-1deg)'},
    {transform: 'rotate(1deg)'}
]

for (i = 0; i < answerButtons.length; i++){
    answerButtons[i].addEventListener('click', function(){
        checkAnswer(this.innerHTML);
    })
}

function runTest(){
    //This will run the test itself. Each run will output a symbol, 4 options, and compare results.
    startTimer();
    outputSymbol();
}

function randomizeSymbol(){
    //Use a random number to find a random key from Symbols list. Pass that symbol and an index down.
    let randomIndex = Math.floor(Math.random() * 26)
    if (randomIndex == prevAnswerIndex){
        while (randomIndex == prevAnswerIndex){
            randomIndex = Math.floor(Math.random() * 26);
        }
    }
    let randomSymbol = Object.keys(symbolsObject)[randomIndex];
    let returnedObject = symbolsObject[randomSymbol];
    returnedObject.index = randomIndex;

    return returnedObject;
}

function outputSymbol(){
    //pull randomizeSymbol(), create img element in existing section, output.
    //Pass randomizedSymbol to next function.
    const symbolImageElement = document.querySelector('#symbolOutputContainer img'); //can move after build

    let randomizedSymbol = randomizeSymbol();
    symbolImageElement.src = randomizedSymbol.imageLocation;
    symbolImageElement.alt = randomizedSymbol.alt;
    answer = randomizedSymbol.symbolName;
    prevAnswerIndex = randomizedSymbol.index;

    randomizeResponses(randomizedSymbol);
    return randomizedSymbol;
}

function randomizeResponses(answer){
    //Takes answer passed from randomizeSymbol in outputSymbol, creates 3 more random answers.
    let responses = [answer.symbolName];

    //generate an array of symbol keys, then remove the used one.
    let symbolsKeys = Object.keys(symbolsObject);
    symbolsKeys.splice(answer.index, 1);

    //check if the number of responses matches the responseDifficulty milestone (default 4).
    //shuffle responses at the end.
    while (responses.length < responseDifficulty){
        let tempIndex = Math.floor(Math.random() * symbolsKeys.length);
        responses.push(symbolsKeys[tempIndex]);
        symbolsKeys.splice(tempIndex, 1);
        if (responses.length == responseDifficulty){
            for (let i = responses.length - 1; i > 0; i--){
                let randIndex = Math.floor(Math.random() * (i+1));
                [responses[i], responses[randIndex]] =  [responses[randIndex], responses[i]];
            }
        }
    }
    outputAnswers(responses);
}

function showHiddenResponses(){
    //Remove hidden class from elements as responseDifficulty increases
    for (let i = 0; i < responseDifficulty; i++){
        if (answerButtons[i].classList.contains('hidden')){
            answerButtons[i].classList.remove('hidden');
        }
    }
}

function hideUneededResponses(){
    //hide responses that are no longer needed. Should be called on score reset.
    for (let i = 4; i < answerButtons.length; i++){
        if (answerButtons[i].classList.contains('hidden') == false){
            answerButtons[i].classList.add('hidden');
        }
    }   
}



function outputAnswers(answers){
    for (let i = 0; i < answerButtons.length; i++){
        answerButtons[i].innerHTML = answers[i];
    }
}

function checkAnswer(selectedResponse){
    //check if answer matches, if so increase score and generate new test.
    if (selectedResponse == answer){
        score++
        scoreOutput.textContent = score;
        clearTimer();
        runTest();
    } else {
        score = 0;
        scoreOutput.textContent = score;
        shakeContainer();
        playGuardianDown();
        clearTimer();
    }
}

function setDifficulty(){
    //adjusts difficulty at 5 and 10 consecutive correct answers.
    if (score >= 10) {
        timer = 5;
        responseDifficulty = 8;
        showHiddenResponses();
    } else if (score >= 5) {
        timer = 15;
        responseDifficulty = 6;
        showHiddenResponses();

    } else {
        responseDifficulty = 4;
        timer = 30;
        showHiddenResponses();
        if (score == 1){
            hideUneededResponses();
        }
    }
}

function startTimer(){
    //Reduce timer variable set by difficulty. At 0, clear the score. 
    setDifficulty();
    timerInterval = setInterval(function(){
        timer--
        if (timer == 0){
            clearTimer();
            score = 0;
            scoreOutput.textContent = score;
            timerOutput.textContent = ":0" + timer;
            playGuardianDown();
            shakeContainer();
        } else if (timer < 10){
            timerOutput.textContent = ":0" + timer;
        } else {
            timerOutput.textContent = ":" + timer;
        }
    },1000)
}

function clearTimer(){
    clearInterval(timerInterval);
    timer = 0;
    timerOutput.textContent = ':0' + timer;
}

function playGuardianDown(){
    guardianDownSound.play();
}

function shakeContainer(){
    //shakes container when incorrect answer is selected.
    outputContainer.animate(shakeAnimation, 100, 1);
}
    runTest();
});

