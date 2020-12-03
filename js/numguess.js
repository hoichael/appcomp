const buttonSFX = new Audio("audio/button.wav");
const textSFX = new Audio("audio/text.wav");
const successSFX = new Audio("audio/success.wav");
const failureSFX = new Audio("audio/failure.wav");

const buttons = document.querySelectorAll(".init-btn");
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function(e) {
        buttonSFX.currentTime = 0;
        buttonSFX.play();
        Game(e.target.getAttribute("data-difficulty"));
    });
}

document.querySelector("#reset-btn").addEventListener("click", Init);

document.querySelector("#btn-play").addEventListener("click", difficultySelect);

document.querySelector("#btn-history").addEventListener("click", historyPage);

Init();

function Init()
{    
    if(!localStorage.getItem("iterations")) {
        localStorage.setItem("iterations", -1);
    }

    buttonSFX.currentTime = 0;
    buttonSFX.play();

    showMenuButtons();
    hideDifficultyButtons();
    hideHistory();
    hideResetButton();
    setHeading("Main Menu");
    hideGuessInput();
}

function Game(difficulty)
{
    let rangeStart = 1;
    let rangeEnd;

    switch (difficulty) {
        case "Easy":
            console.log("selected easy");
            rangeEnd = 3;
            break;
        case "Medium":
            console.log("selected medium");
            rangeEnd = 5;
            break;
        case "Hard":
            console.log("selected hard");
            rangeEnd = 10;
            break;
    }

    console.log(rangeEnd);

    const generatedNum = Math.floor(Math.random() * rangeEnd + rangeStart);

    setHeading(`You've chosen the ${difficulty} difficulty. Please enter a number between ${rangeStart} and ${rangeEnd}`);

    hideDifficultyButtons();

    showGuessInput();

    const guessInput = document.querySelector("#guess-input");
    const guessSubmit = document.querySelector("#guess-submit");

    guessSubmit.onclick = function() {
        const actualInput = parseInt(guessInput.value);
        if(!actualInput)
        {
            console.log("INVALID (empty)");
            alert("Invalid Input. Please enter a whole number within the expected range")
        }
        else if(actualInput < rangeStart || actualInput > rangeEnd)
        {
            console.log("INVALID (out of range)");
            alert("Invalid Input. Please enter a whole number within the expected range");
        }
        else
        {
            console.log("init result()");
            conclude(actualInput, generatedNum, difficulty);
        }
    };
}

function currentDate()
{
    let now = new Date();
    let date = now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate();
    let time = now.getHours() + ":" + now.getMinutes() + ":" + (now.getSeconds() < 10 ? "" + 0 + now.getSeconds() : now.getSeconds());
    let fullDateTime = date+" "+time; 
    return fullDateTime;
}

function conclude(guess, generatedNum, difficulty)
{
    hideGuessInput();

    let info = {
        Date: currentDate(),
        Difficulty: difficulty,
        YourGuess: guess,
        GeneratedNumber : generatedNum
    }

    localStorage.setItem("iterations", parseInt(localStorage.getItem("iterations")) +1);
    localStorage.setItem(localStorage.getItem("iterations"), JSON.stringify(info));
    console.log(info);

    let currentIt = 0;
    let interval = 30;
    output(guess, generatedNum, currentIt, interval);
}

function output(guess, generatedNum, currentIt, interval) {
    if(currentIt < 50) {
        setHeading(`The generated number is... ${Math.floor(Math.random() * 10) + 1}.`);
        interval += 2.2*(currentIt*0.25);
        currentIt++
        textSFX.currentTime = 0;
        textSFX.play();
        setTimeout(output, interval, guess, generatedNum, currentIt, interval);
    } else {
        if(guess == generatedNum) {
            successSFX.play();
            setHeading(`The generated number is indeed ${generatedNum}. Impressive!`);
            showResetButton();
        } else {
            failureSFX.play();
            setHeading(`The generated number is ${generatedNum}. Too bad!`);
            showResetButton();
        }
    }
}


function genTableHead(table, data) {
    
    if(!document.querySelector("th"))
    {
        let tableHead = table.createTHead();
        let tableRow = tableHead.insertRow();
    
        for (let key of data) {
            let th = document.createElement("th");
            let text = document.createTextNode(key);
            th.appendChild(text);
            tableRow.appendChild(th);
        }
    }
}

function popTable(table, data) {

    let tableRows = table.querySelectorAll("tr");
    for (let i = 0; i < tableRows.length; i++) {
        tableRows[i].remove();
    }

    for (let element of data) {

        let row = table.insertRow();
        if (element.YourGuess == element.GeneratedNumber) {
            row.id = "green";
        }
        else {
            row.id = "red";
        }
        
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
      }
    }
  }

function historyPage() {
    setHeading("History");
    showHistory();
    hideMenuButtons();
    showResetButton();

    buttonSFX.currentTime = 0;
    buttonSFX.play();

    let localStorageObjects = [];

    for (let i = 0; i < localStorage.length; i++) {
        if(localStorage[i] !== undefined) {
            let temp = JSON.parse(localStorage[i]);
            localStorageObjects.push(temp);
        }      
    }
    
    localStorageObjects.reverse();

    let table = document.querySelector("#history-table");
    popTable(table, localStorageObjects);
    genTableHead(table, Object.keys(localStorageObjects[0]));
}

function difficultySelect() {
    setHeading("Select your Difficulty");
    buttonSFX.currentTime = 0;
    buttonSFX.play();
    showDifficultyButtons();
    hideMenuButtons();
    showResetButton();
}

function setHeading(newHeading) {
    document.querySelector("#heading").innerText = newHeading;
}

function showDifficultyButtons() {
    document.querySelectorAll(".init-btn")
        .forEach(function(btn) {
            btn.classList.remove("hide");
        });
}

function hideDifficultyButtons() {
    document.querySelectorAll(".init-btn")
        .forEach(function(btn) {
            btn.classList.add("hide");
        });
}

function showGuessInput() {
    document.querySelector("#guess").classList.remove("hide");
}

function hideGuessInput() {
    document.querySelector("#guess").classList.add("hide");
}

function showResetButton() {
    document.querySelector("#reset-btn").classList.remove("hide");
}

function hideResetButton() {
    document.querySelector("#reset-btn").classList.add("hide");
}

function hideHistory() {
    document.querySelector("#history-table").classList.add("hide");
}

function showHistory() {
    document.querySelector("#history-table").classList.remove("hide");
}

function hideMenuButtons() {
    document.querySelector("#main-menu").classList.add("hide");
}

function showMenuButtons() {
    document.querySelector("#main-menu").classList.remove("hide");
}