type HangmanWordProps = {
    guessedLetters: string[];
    wordToGuess: string;
    reveal?: boolean;
}

export default function HangmanWord({ guessedLetters, wordToGuess, reveal = false }: HangmanWordProps) {
    return (
        <div style={{
            display: "flex",
            gap: ".25em",
            fontSize: "4rem",
            fontWeight: "700",
            textTransform: "uppercase",
        }}>
            {wordToGuess.split("").map((letter: string, index: number) => (
                <span key={index} style={{ borderBottom: ".1em solid #fff" }}>
                    <span style={{
                        visibility: guessedLetters.includes(letter) || reveal
                            ? "visible"
                            : "hidden",
                        color: !guessedLetters.includes(letter) && reveal
                            ? "#e43535"
                            : "#fff",
                    }}>{letter}</span>
                </span>
            ))}
        </div>
    )
}
