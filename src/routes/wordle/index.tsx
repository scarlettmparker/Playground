import { useEffect, useRef, useState } from 'react';
import styles from './wordle.module.css';

const words = ["ALBUM", "HINGE", "MONEY", "SCRAP", "GAMER", "GLASS", "SCOUR", "BEING", "DELVE", "YIELD", "METAL", "TIPSY", "SLUNG", "FARCE", "GECKO", "SHINE", "CANNY", "MIDST", "BADGE", "HOMER", "TRAIN", "STORY", "HAIRY", "FORGO", "LARVA", "TRASH", "ZESTY", "SHOWN", "HEIST", "ASKEW", "INERT", "OLIVE", "PLANT", "OXIDE", "CARGO", "FOYER", "FLAIR", "AMPLE", "CHEEK", "SHAME", "MINCE", "CHUNK", "ROYAL", "SQUAD", "BLACK", "STAIR", "SCARE", "FORAY", "COMMA", "NATAL", "SHAWL", "FEWER", "TROPE", "SNOUT", "LOWLY", "STOVE", "SHALL", "FOUND", "NYMPH", "EPOXY", "DEPOT", "CHEST", "PURGE", "SLOSH", "THEIR", "RENEW", "ALLOW", "SAUTE", "MOVIE", "CATER", "TEASE", "SMELT", "FOCUS", "TODAY", "WATCH", "LAPSE", "MONTH", "SWEET", "HOARD", "CLOTH", "BRINE", "AHEAD", "MOURN", "NASTY", "RUPEE", "CHOKE", "CHANT", "SPILL", "VIVID", "BLOKE", "TROVE", "THORN", "OTHER", "TACIT", "SWILL", "DODGE", "SHAKE", "CAULK", "AROMA", "CYNIC", "ROBIN", "ULTRA", "ULCER", "PAUSE", "HUMOR", "FRAME", "ELDER", "SKILL", "ALOFT", "PLEAT", "SHARD", "MOIST", "THOSE", "LIGHT", "WRUNG", "COULD", "PERKY", "MOUNT", "WHACK", "SUGAR", "KNOLL", "CRIMP", "WINCE", "PRICK", "ROBOT", "POINT", "PROXY", "SHIRE", "SOLAR", "PANIC", "TANGY", "ABBEY", "FAVOR", "DRINK", "QUERY", "GORGE", "CRANK", "SLUMP", "BANAL", "TIGER", "SIEGE", "TRUSS", "BOOST", "REBUS", "UNIFY", "TROLL", "TAPIR", "ASIDE", "FERRY", "ACUTE", "PICKY", "WEARY", "GRIPE", "CRAZE", "PLUCK", "BRAKE", "BATON", "CHAMP", "PEACH", "USING", "TRACE", "VITAL", "SONIC", "MASSE", "CONIC", "VIRAL", "RHINO", "BREAK", "TRIAD", "EPOCH", "USHER", "EXULT", "GRIME", "CHEAT", "SOLVE", "BRING", "PROVE", "STORE", "TILDE", "CLOCK", "WROTE", "RETCH", "PERCH", "ROUGE", "RADIO", "SURER", "FINER", "VODKA", "HERON", "CHILL", "GAUDY", "PITHY", "SMART", "BADLY", "ROGUE", "GROUP", "FIXER", "GROIN", "DUCHY", "COAST", "BLURT", "PULPY", "ALTAR", "GREAT", "BRIAR", "CLICK", "GOUGE", "WORLD", "ERODE", "BOOZY", "DOZEN", "FLING", "GROWL", "ABYSS", "STEED", "ENEMA", "JAUNT", "COMET", "TWEED", "PILOT", "DUTCH", "BELCH", "OUGHT", "DOWRY", "THUMB", "HYPER", "HATCH", "ALONE", "MOTOR", "ABACK", "GUILD", "KEBAB", "SPEND", "FJORD", "ESSAY", "SPRAY", "SPICY", "AGATE", "SALAD", "BASIC", "MOULT", "CORNY", "FORGE", "CIVIC", "ISLET", "LABOR", "GAMMA", "LYING", "AUDIT", "ROUND", "LOOPY", "LUSTY", "GOLEM", "GONER", "GREET", "START", "LAPEL", "BIOME", "PARRY", "SHRUB", "FRONT", "WOOER", "TOTEM", "FLICK", "DELTA", "BLEED", "ARGUE", "SWIRL", "ERROR", "AGREE", "OFFAL", "FLUME", "CRASS", "PANEL", "STOUT", "BRIBE", "DRAIN", "YEARN", "PRINT", "SEEDY", "IVORY", "BELLY", "STAND", "FIRST", "FORTH", "BOOBY", "FLESH", "UNMET", "LINEN", "MAXIM", "POUND", "MIMIC", "SPIKE", "CLUCK", "CRATE", "DIGIT", "REPAY", "SOWER", "CRAZY", "ADOBE", "OUTDO", "TRAWL", "WHELP", "UNFED", "PAPER", "STAFF", "CROAK", "HELIX", "FLOSS", "PRIDE", "BATTY", "REACT", "MARRY", "ABASE", "COLON", "STOOL", "CRUST", "FRESH", "DEATH", "MAJOR", "FEIGN", "ABATE", "BENCH", "QUIET", "GRADE", "STINK", "KARMA", "MODEL", "DWARF", "HEATH", "SERVE", "NAVAL", "EVADE", "FOCAL", "BLUSH", "AWAKE", "HUMPH", "SISSY", "REBUT", "CIGAR"]

const colorMap: Record<number, string> = {
  0: "#dbdbdb",
  1: "#f2e446",
  2: "#12cc28"
};

type Letter = {
  value: string
  color: number
}

type Word = {
  letters: Letter[]
}

function fixDivs(string: string) {
  let fixed_string = "";
  let start = true;

  for (let i = 0; i < string.length; i++) {
    fixed_string += string[i];
    if (string[i] == "<" && string[i + 4] == ">") {
      fixed_string += start ? "div>" : "/div>";
      start = !start;
      i += 4;
    }
  }

  return fixed_string;
}

const Wordle: React.FC = () => {
  const [wordleWord, setWordleWord] = useState("");
  const [guess, setGuess] = useState<string>("");
  const [guesses, setGuesses] = useState<Word[]>([]);
  const [currentGuess, setCurrentGuess] = useState(0);

  const setRandomWord = () => {
    const word = words[Math.floor(Math.random() * words.length)];
    setWordleWord(word);
  }

  const typeLetter = (e: KeyboardEvent) => {
    const keys = /^[a-zA-Z]$/;

    if (keys.test(e.key)) {
      // user has entered a letter
      if (guess.length == 5) return;
      setGuess(guess + e.key.toUpperCase());
    } else if (e.key === "Backspace") {
      // remove a letter
      if (guess.length == 0) return;
      setGuess(guess.substring(0, guess.length - 1));
    } else if (e.key === "Enter") {
      if (guess.length != 5) return;
      if (currentGuess != 6) {
        submitGuess(guess);
      }
    }
  }

  const submitGuess = (guess: string) => {
    const letters = guess.split('');
    let word: Word = { letters: Array(5).fill(null) };

    // Add letters with their colours
    letters.forEach((letter, index) => {
      const color = getColor(letter, index);
      let wordLetter: Letter = { value: letter, color: color };
      word.letters[index] = wordLetter;
    });

    const newGuesses = guesses;
    newGuesses.push(word);
    setGuesses(newGuesses);
    setCurrentGuess(currentGuess + 1);
    setGuess("");

    if (guess.toUpperCase() != wordleWord.toUpperCase()) {
      console.log("Incorrect!");
      if (currentGuess == 5) {
        console.log("You lose!");
        console.log("The word was: ", wordleWord);
      }
    } else {
      console.log("Correct!");
    }
  }

  const getColor = (letter: string, index: number) => {
    let found: boolean = false;
    let foundExact: boolean = false;

    Array.from(wordleWord).map((wordleLetter, wordleIndex) => {
      if (letter.toUpperCase() == wordleLetter.toUpperCase()) {
        found = true;
        if (wordleIndex == index) {
          foundExact = true;
        }
      }
    })

    if (foundExact) {
      return 2;
    }
    else if (found) {
      return 1;
    }
    else {
      return 0;
    }

  }

  useEffect(() => {
    setRandomWord();
  }, [])

  useEffect(() => {
    console.log(fixDivs("<div>hi<div><div>hi<div><div>hi<div>"));
    window.addEventListener("keydown", typeLetter);

    return (() => {
      window.removeEventListener("keydown", typeLetter);
    })
  }, [guess])

  return (
    <div className={styles.wordle}>
      {guesses.map((guess, idx) => {
        return (
          <div key={idx} className={styles.word}>
            {guess.letters.map((letter, idx) => {
              return (
                <div key={idx} className={styles.letter} style={{
                  "backgroundColor": colorMap[letter.color]
                }}>
                  {letter.value}
                </div>
              )
            })}
          </div>
        )
      })}
      <div className={styles.input}>
        {guess}
      </div>
    </div>
  )
};

export default Wordle;