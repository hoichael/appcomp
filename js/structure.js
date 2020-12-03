import {nounsSingular} from "./nounssingular.js";
import {nounsPlural} from "./nounsplural.js";
import {verbsFirstForm} from "./verbsfirstform.js";
import {adjectives} from "./adjectives.js";
import {adverbs} from "./adverbs.js";
import {names, pronouns} from "./names.js";
import {vowelNouns, consonantNouns, vowelAdjectives, consonantAdjectives, verbsThirdForm} from "./customdata.js";

// struc obj = define grammatical compatiblity structure

// link obj = link grammatical elements to data

const strucHave = {
    // Layer 1
    "init": ["i", "you", "pronoun", "name", "we", "they"],

    // Layer 2
    "i": ["have"],
    "you": ["have"],
    "pronoun": ["has"],
    "name": ["has"],
    "we": ["have"],
    "they": ["have"],

    // Layer 3
    "have": ["a", "an"],
    "has": ["a", "an"],
    "and": ["a", "an"],

    // Layer 4
    "a": ["consonantadjective"],
    "an": ["voweladjective"],

    // Layer 5
    "consonantadjective": ["singularnoun"],
    "voweladjective": ["singularnoun"],

    // End
    "singularnoun": ["end", "end", "and"]
}

const linkHave = {
    "i": ["I"],
    "you": ["You"],
    "we": ["We"],
    "they": ["They"],
    "have": ["have"],
    "has": ["has"],
    "name": names,
    "pronoun": pronouns,
    "and": ["and"],
    "end": ["."],
    "voweladjective": vowelAdjectives,
    "consonantadjective": consonantAdjectives,
    "singularnoun": nounsSingular,
    "a": ["a"],
    "an": ["an"]
}

const strucSimple = {

    "init": ["i", "you", "pronoun", "name", "we", "they"],

    "i": ["have", "am", "fpverb"],
    "you": ["have", "are", "fpverb"],
    "pronoun": ["has", "is", "tpverb"],
    "name": ["has", "is", "tpverb"],
    "we": ["have", "fpverb"],
    "they": ["have", "fpverb"],

    "it": ["has", "is"],
    "which": ["is", "tpverb"],

    "have": ["a", "an"],
    "has": ["a", "an"],
    "am": ["a", "an"],
    "is": ["a", "an"],
    "are": ["a", "an"],

    "fpverb": ["adverb", "adverb", "comma", "and", "a", "an"],
    "tpverb": ["adverb", "adverb", "comma", "and", "a", "an"],
    "adverb": ["and", "comma", "end", "end"],

    "and": ["init"],
    "comma": ["init"],

    "a": ["consonantadjective"],
    "an": ["voweladjective"],

    "consonantadjective": ["singularnoun"],
    "voweladjective": ["singularnoun"],

    "singularnoun": ["end", "end", "and", "which", "comma"]
}

const linkSimple = {
    "i": ["I"],
    "you": ["You"],
    "we": ["We"],
    "they": ["They"],
    "have": ["have"],
    "has": ["has"],
    "name": names,
    "pronoun": pronouns,
    "and": ["and"],
    "end": ["."],
    "voweladjective": vowelAdjectives,
    "consonantadjective": consonantAdjectives,
    "singularnoun": nounsSingular,
    "a": ["a"],
    "an": ["an"],
    "am": ["am"],
    "is": ["is"],
    "are": ["are"],
    "it": ["it"],
    "which": ["which"],
    "comma": [","],
    "tpverb": verbsThirdForm,
    "fpverb": verbsFirstForm,
    "adverb": adverbs,
    "init": [""]
}


export{
    strucHave, linkHave,
    strucSimple, linkSimple    
};