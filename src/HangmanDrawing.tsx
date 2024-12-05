import styles from "./HangmanDrawing.module.css";

const HEAD = (
    <div className={`${styles.head} ${styles.line}`} />
);
const BODY = (
    <div className={`${styles.body} ${styles.line}`} />
);
const LEFT_HAND = (
    <div className={`${styles.lefthand} ${styles.line}`} />
);
const RIGHT_HAND = (
    <div className={`${styles.righthand} ${styles.line}`} />
);
const LEFT_LEG = (
    <div className={`${styles.leftleg} ${styles.line}`} />
);
const RIGHT_LEG = (
    <div className={`${styles.rightleg} ${styles.line}`} />
);

const BODY_PARTS: React.ReactNode[] = [HEAD, BODY, LEFT_HAND, RIGHT_HAND, LEFT_LEG, RIGHT_LEG];

type HangmanDrawingProps = {
    numberOfGuesses: number;
}

export default function HangmanDrawing({ numberOfGuesses }: HangmanDrawingProps) {
    return (
        <div className={styles.container}>
            {BODY_PARTS.slice(0, numberOfGuesses)}
            <div className={`${styles.rope} ${styles.line}`} />
            <div className={`${styles.top} ${styles.line}`} />
            <div className={`${styles.vertical} ${styles.line}`} />
            <div className={`${styles.bottom} ${styles.line}`} />
        </div>
    )
}
