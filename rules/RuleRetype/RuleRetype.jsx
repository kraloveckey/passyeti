import React, { useState, useEffect, useRef } from 'react';
import Rule from "../Rule";
import ReloadButton from '../../components/ReloadButton';
import styles from "./RuleRetype.module.css";

const TIME_LIMIT_MS = 60000;

function RetypeBox({ originalPassword, setCorrect, setPswd, preventSort }) {
    const [typed, setTyped] = useState("");
    const [timeLeft, setTimeLeft] = useState(TIME_LIMIT_MS / 1000);
    const [expired, setExpired] = useState(false);
    const [matched, setMatched] = useState(false);

    useEffect(() => {
        if (matched || expired) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setExpired(true);
                    setCorrect(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [matched, expired, setCorrect]);

    const handleChange = (e) => {
        const value = e.target.value;
        setTyped(value);

        if (value === originalPassword) {
            setMatched(true);
            setCorrect(true);
            
            if (preventSort) preventSort();
            
            setPswd(originalPassword);
        } else {
            setCorrect(false);
        }
    };
    
    const handleReload = () => {
        window.location.reload();
    };

    const textareaClassName = styles.textarea + (matched ? ' ' + styles.correct : '');

    return (
        <div className={styles.wrapper}>
            <textarea
                className={textareaClassName}
                placeholder="Re-type your password here..."
                value={typed}
                onChange={handleChange}
                disabled={expired || matched}
            />

            <div className={styles.bottomArea}>
                {!expired && !matched && (
                    <div className={styles.timer}>
                        Time left: {Math.floor(timeLeft / 60)}:
                        {(timeLeft % 60).toString().padStart(2, "0")}
                    </div>
                )}

                {matched && (
		    null
                )}

                {expired && !matched && (
                    <div className={styles.reloadBlock}>
                        <div className={styles.timeUp}>Time’s up! Play again?</div>
                        <ReloadButton
                            onClick={handleReload}
                            hidden={false}
                            reloadsLeft={1}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default class RuleRetype extends Rule {
    constructor() {
        super("Re-type the password into another textbox. You have 1 minute to do this. Good luck.");

        this.isCorrect = false;

        this.renderItem = ({ pswd, setPswd, preventSort }) => (
            <RetypeBox
                originalPassword={pswd}
                setPswd={setPswd}
                setCorrect={(status) => (this.isCorrect = status)}
                preventSort={preventSort}
            />
        );
    }

    check = (txt, props) => {
        if (this.isCorrect && props && props.preventSort) {
            props.preventSort();
        }
        return this.isCorrect;
    };
}