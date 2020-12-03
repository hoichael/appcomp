import {nounsSingular} from "./nounssingular.js";
import {verbsFirstForm} from "./verbsfirstform.js";
import {adjectives} from "./adjectives.js";

// init custom databases
let vowelNouns = [];
let consonantNouns = [];
let vowelAdjectives = [];
let consonantAdjectives = [];
let verbsThirdForm = [];

// fill custom databases
nounsSingular.forEach(element => {
    let elementUp = element.toUpperCase();
    if(elementUp.charAt(0) == "A"
    || elementUp.charAt(0) == "E"
    || elementUp.charAt(0) == "I"
    || elementUp.charAt(0) == "O"
    || elementUp.charAt(0) == "U"
    ) {
       vowelNouns.push(element); 
    }
    else {
        consonantNouns.push(element);
    }
});

adjectives.forEach(element => {
    let elementUp = element.toUpperCase();
    if(elementUp.charAt(0) == "A"
    || elementUp.charAt(0) == "E"
    || elementUp.charAt(0) == "I"
    || elementUp.charAt(0) == "O"
    || elementUp.charAt(0) == "U"
    ) {
       vowelAdjectives.push(element); 
    }
    else {
        consonantAdjectives.push(element);
    }
});

verbsFirstForm.forEach(element => {
    if(element.charAt(element.length -1) ==  "y") {
        verbsThirdForm.push(element.substring(0, element.length -1).concat("ies"));
    }
    else if(element.charAt(element.length -1) == "s") {
        verbsThirdForm.push(element.concat("es"));
    }
    else {
        verbsThirdForm.push(element.concat("s"));
    }
});

export {vowelNouns, consonantNouns, vowelAdjectives, consonantAdjectives, verbsThirdForm};

