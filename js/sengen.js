import{
    strucHave, linkHave,
    strucSimple, linkSimple,
} from "./structure.js";

const textSFX = new Audio("audio/text.wav");

let targetField = document.querySelector("#text-output");
let initButton = document.querySelector(".btn-init")
let sentence;
let structure = strucSimple;
let link = linkSimple;

initButton.addEventListener("click", init);

function init() {
    sentence = "";
    getRandomWord("init");
}

function getRandomWord(key) {
    let val = Math.floor(Math.random() * structure[key].length);
    let newKey = structure[key][val];
    let database = link[newKey];
    let word = database[Math.floor(Math.random() * database.length)];
    
    word = word.toLowerCase();

    generate(newKey, word);

}

function generate(key, value) {

    if (value == ".") {
        sentence = sentence.concat(`${value}`)
        format(sentence);
    }
    else if(value == ",") {
        sentence = sentence.concat(`${value}`)
        getRandomWord(key);
    }
    else if(value == "") {
        sentence = sentence.concat(`${value}`)
        getRandomWord(key);
    }
    else {
        sentence = sentence.concat(` ${value}`)
        getRandomWord(key);
    } 
}

function format(sentence) {
    sentence = sentence.slice(1);
    sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);

    console.log(`FINAL SENTENCE: ${sentence}`);
    
    let sentenceArray = Array.from(sentence);
    let incr = 0;
    let outputStr = "";
    initButton.removeEventListener("click", init);
    output(sentenceArray, incr, outputStr);
}

function output(sentenceArray, incr, outputStr) {
    if(incr < sentenceArray.length) {
        let currentOutput = outputStr.concat(sentenceArray[incr]);
        targetField.textContent = currentOutput;
        outputStr = currentOutput;
        incr++
        textSFX.currentTime = 0;
        textSFX.play();
        setTimeout(
            function() {
                output(sentenceArray, incr, outputStr);
            },
            110
        );
    } else {
        initButton.addEventListener("click", init);
    }
}
