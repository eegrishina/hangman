import styles from "./Keyboard.module.css";

const KEYS_EN: string[] = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
];

const KEYS_RU: string[] = [
    "а",
    "б",
    "в",
    "г",
    "д",
    "е",
    "ё",
    "ж",
    "з",
    "и",
    "й",
    "к",
    "л",
    "м",
    "н",
    "о",
    "п",
    "р",
    "с",
    "т",
    "у",
    "ф",
    "х",
    "ц",
    "ч",
    "ш",
    "щ",
    "ъ",
    "ы",
    "ь",
    "э",
    "ю",
    "я",
];

type KeyboardProps = {
    isEnglish: boolean;
    disabled?: boolean;
    activeLetters: string[];
    inactiveLetters: string[];
    addGuessedLetter: (letter: string) => void;
}

export default function Keyboard({
    isEnglish,
    activeLetters,
    inactiveLetters,
    addGuessedLetter,
    disabled = false }: KeyboardProps) {

    const language: string[] = isEnglish ? KEYS_EN : KEYS_RU;

    return (
        <div className={styles.container}>
            {language.map(key => {
                const isActive = activeLetters.includes(key);
                const isInactive = inactiveLetters.includes(key);
                return (
                    <button
                        onClick={() => addGuessedLetter(key)}
                        className={`${styles.btn} 
                        ${isActive ? styles.active : ""} 
                        ${isInactive ? styles.inactive : ""}`}
                        disabled={isInactive || isActive || disabled}
                        key={key} >
                        {key}
                    </button>
                )
            })}
        </div>
    )
}
