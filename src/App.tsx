import { useCallback, useEffect, useState } from "react";
import HangmanDrawing from "./HangmanDrawing";
import HangmanWord from "./HangmanWord";
import Keyboard from "./Keyboard";
import wordsEN from "./wordList_en.json";
import wordsRU from "./wordList_ru.json";
import styles from "./App.module.css";

function getWord(isEnglish: boolean): string {
    if (isEnglish) {
        return wordsEN[Math.floor(Math.random() * wordsEN.length)];
    } else {
        return wordsRU[Math.floor(Math.random() * wordsRU.length)];
    }
}

export default function App() {
    const [isEN, setIsEn] = useState<boolean>(() => {
        const storageLanguage: string | null = localStorage.getItem("language");
        if (storageLanguage) {
            return storageLanguage === "en";
        } else {
            return true;
        }
    });

    const [wordToGuess, setWordToGuess] = useState(getWord(isEN));
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
    const incorrectLetters: string[] = guessedLetters.filter(letter => !wordToGuess.includes(letter));

    const isLoser: boolean = incorrectLetters.length >= 6;
    const isWinner: boolean = wordToGuess
        .split("")
        .every(letter => guessedLetters.includes(letter));

    const addGuessedLetter = useCallback(
        (letter: string): void => {
            if (guessedLetters.includes(letter) || isWinner || isLoser) return;
            setGuessedLetters(currentLetters => [...currentLetters, letter]);
        }, [guessedLetters, isWinner, isLoser, isEN]);

    useEffect(() => {
        const handler = (e: KeyboardEvent): void => {
            const key = e.key;
            if (isEN && !key.match(/^[a-z]$/)) return;
            if (!isEN && !key.match(/^[а-я]$/)) return;

            e.preventDefault();
            addGuessedLetter(key);
        }

        document.addEventListener("keypress", handler);
        return () => {
            document.removeEventListener("keypress", handler);
        }
    }, [guessedLetters])

    useEffect(() => {
        const handler = (e: KeyboardEvent): void => {
            const key = e.key;
            if (key !== "Enter") return;

            e.preventDefault();
            setGuessedLetters([]);
            setWordToGuess(getWord(localStorage.getItem("language") === "en"));
        }

        document.addEventListener("keypress", handler);
        return () => {
            document.removeEventListener("keypress", handler);
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("language", isEN ? "en" : "ru");
    }, [isEN]);

    return (
        <div className={styles.container}>
            <button className={styles.btn}
                onClick={() => {
                    setIsEn(!isEN);
                    setGuessedLetters([]);
                    setWordToGuess(getWord(!isEN));
                }}>
                <span className={isEN ? styles.active : styles.inactive}>EN</span>
                <span className={!isEN ? styles.active : styles.inactive}>RU</span>
            </button>
            <h1 className={styles.losewin}
                style={{
                    color: isLoser ? "#e43535" : "#0088cc",
                }}>
                {isWinner && (isEN ? "Winner! - Refresh or press Enter to try again"
                    : "Победа! - Обновите страницу или нажмите Enter, чтобы повторить попытку")}
                {isLoser && (isEN ? "You lose :( - Refresh or press Enter to try again"
                    : "Вы проиграли :( - Обновите страницу или нажмите Enter, чтобы повторить попытку")}
            </h1>
            <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
            <HangmanWord
                reveal={isLoser}
                guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
            <div style={{ alignSelf: "stretch" }}>
                <Keyboard
                    isEnglish={isEN}
                    disabled={isWinner || isLoser}
                    activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))}
                    inactiveLetters={incorrectLetters}
                    addGuessedLetter={addGuessedLetter} />
            </div>
        </div>
    )
}
