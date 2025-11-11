import Rule from "./Rule";
import RuleWordle from "./RuleWordle/RuleWordle";
import RuleSlidingPuzzle from "./RuleSlidingPuzzle/RuleSlidingPuzzle";
import RuleMorse from "./RuleMorse/RuleMorse";
import RuleRiddle from "./RuleRiddle/RuleRiddle";
import RuleLocation from "./RuleLocation/RuleLocation";
import RuleTimeEmoji from "./RuleTimeEmoji/RuleTimeEmoji";
import RuleQR from "./RuleQR/RuleQR";
import RuleSum from "./RuleSum/RuleSum";
import RuleEarthquake from "./RuleEarthquake/RuleEarthquake";
import RuleColorFlash from "./RuleColorFlash/RuleColorFlash";
import RuleDayOfWeek from "./RuleDayOfWeek/RuleDayOfWeek";
import RuleMoonPhase from "./RuleMoonPhase/RuleMoonPhase";
import RulePetEgg from "./RulePetEgg/RulePetEgg";
import RuleFire from "./RuleFire/RuleFire";
import RuleCaptcha from "./RuleCaptcha/RuleCaptcha";
import RuleHatchedYeti from "./RuleHatchedYeti/RuleHatchedYeti";
import RuleMonth from "./RuleMonth/RuleMonth";
import RuleHexColor from "./RuleHexColor/RuleHexColor";
import RuleSacrifice from "./RuleSacrifice/RuleSacrifice";
import RuleCurrentTime from "./RuleCurrentTime/RuleCurrentTime";
import RuleRetype from "./RuleRetype/RuleRetype";
import RuleRetypeNoPaste from "./RuleRetypeNoPaste/RuleRetypeNoPaste";

function createRules(wordleSolution, moonPhase) {
    return [
    new Rule(
        "Your password must include an uppercase and a lowercase letter.",
        (t) => (/[A-Z]/.test(t) && /[a-z]/.test(t))
    ),
    new Rule(
        "Your password must include a roman numeral.",
        (t) => /[IVXLCDM]/.test(t)
    ),
    new Rule(
        "Your password must include a two-letter symbol from the periodic table.",
        (t) => /(He|Li|Be|Ne|Na|Mg|Al|Si|Cl|Ar|Ca|Sc|Ti|Cr|Mn|Fe|Co|Ni|Cu|Zn|Ga|Ge|As|Se|Br|Kr|Rb|Sr|Zr|Nb|Mo|Tc|Ru|Rh|Pd|Ag|Cd|In|Sn|Sb|Te|Xe|Cs|Ba|La|Ce|Pr|Nd|Pm|Sm|Eu|Gd|Tb|Dy|Ho|Er|Tm|Yb|Lu|Hf|Ta|Re|Os|Ir|Pt|Au|Hg|Tl|Pb|Bi|Po|At|Rn|Fr|Ra|Ac|Th|Pa|Np|Pu|Am|Cm|Bk|Cf|Es|Fm|Md|No|Lr|Rf|Db|Sg|Bh|Hs|Mt|Ds|Rg|Cn|Nh|Fl|Mc|Lv|Ts|Og)/.test(t)
    ),
    new Rule(
        "Your password must include 2-digit prime number.",
        (t) => /(?:11)|(?:13)|(?:17)|(?:19)|(?:23)|(?:29)|(?:31)|(?:37)|(?:41)|(?:43)|(?:47)|(?:53)|(?:59)|(?:61)|(?:67)|(?:71)|(?:73)|(?:79)|(?:83)|(?:89)|(?:97)/.test(t)
    ),
    new RuleCurrentTime(),
    new Rule( 
        "Your password must be at least 12 characters.",
        (t) => t?.length >= 12
    ),
    new Rule(
        "Your password must contain all the english vowels.",
        (t) => /a/i.test(t) && /e/i.test(t) && /i/i.test(t) && /o/i.test(t) && /u/i.test(t)
    ),
    new Rule(
        "Your password must include a leap year.",
        (t) => /(1[6-9]|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)/.test(t)
    ),
    new Rule( 
        "Your password must include a special character.",
        (t) => /\W/.test(t)
    ),
    new Rule( 
        "Your password must include a negative number.",
        (t) => /-\d/.test(t)
    ),
    new RuleRetypeNoPaste(),
    new RuleSum(),
    new RuleMonth(),
    new RuleSacrifice(),
    new Rule(
        "Your password is not strong enough. It must include at least three strong \u{1F4AA} emojis.",
        (t) => (t.match(/\u{1F4AA}/gu) || []).length >= 3
    ),
    new Rule(
        "Your password must include the microscopic life forms that reside within all living cells and communicate with the Force \u{2B50}",
        (t) => /(midichlorians|midi-chlorians)/i.test(t)
    ),
    new Rule( 
        "Your password must include the name of a continent.",
        (t) => /asia|europe|africa|australia|oceania|north america|south america|antarctica/i.test(t)
    ),
    new Rule( 
        "Your password must contain the value of pi up to first 5 decimal places.",
        (t) => /(?:3\.14159)/.test(t)
    ),    
    new RuleTimeEmoji(),
    new Rule(
        'Your password must contain one of the following affirmations: "i am a genius", "Yeti is my friend", or "this game is easy".',
        (t) => /(i am a genius|Yeti is my friend|this game is easy)/i.test(t)
    ),
    new Rule(
        "Your password must include a valid YouTube video URL.",
        (t) => /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/.test(t)
    ),
    new RuleWordle(wordleSolution),
    new RuleEarthquake(),
    new RuleQR(),
    new RuleMoonPhase(moonPhase),
    new RuleMorse(),
    new RulePetEgg(),
    new RuleLocation(),
    new RuleFire(),
    new RuleColorFlash(),
    new RuleHatchedYeti(),
    new RuleDayOfWeek(),
    new RuleHexColor(),
    new RuleRiddle(),
    new Rule(
        "Your password must have as many vowels as consonants.",
        (t) => (t.match(/[aeiou]/ig) || []).length === (t.match(/[bcdfghjklmnpqrstvwxys]/ig) || []).length
    ),
    new RuleSlidingPuzzle(),
    new RuleCaptcha(),
    new Rule(
        "Your password must include a chess piece symbol.",
        (t) => /[♔♕♖♗♘♙♚♛♜♝♞♟]/.test(t)
    ),
    new Rule(
        "Your password must include the length of your password.",
        (t) => {
            let l = t.length;
            let r = new RegExp(`${l}`);
            return r.test(t);
        }
    ),
    new RuleRetype()
    ];
}

function sort_rules(a, b) {
    if(a.correct == b.correct) {
        return b.num - a.num;
    }
    else if(!a.correct && b.correct) {
        return -1;
    }
    else{
        return 1;
    }
}

export { createRules, sort_rules };