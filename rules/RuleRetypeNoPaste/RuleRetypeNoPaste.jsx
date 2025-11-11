import React, { useState, useEffect, useRef } from 'react';
import Rule from "../Rule";
import ReloadButton from '../../components/ReloadButton';
import styles from "../RuleRetype/RuleRetype.module.css";

const TIME_LIMIT_MS = 60000;

function RetypeNoPasteBox({ originalPassword, setCorrect, setPswd, preventSort }) {
    const [typed, setTyped] = useState("");
    const [timeLeft, setTimeLeft] = useState(TIME_LIMIT_MS / 1000);
    const [expired, setExpired] = useState(false);
    const [matched, setMatched] = useState(false);
    const [wasPasted, setWasPasted] = useState(false);

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
	    setTimeout(() => {
                setPswd(originalPassword);
            }, 0);
        } else {
            setCorrect(false);
        }
    };

    const handleReload = () => {
        window.location.reload();
    };

    const handlePaste = (e) => {
        e.preventDefault();
        setExpired(true);
        setCorrect(false);
        setWasPasted(true);
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
                onPaste={handlePaste} 
            />

            <div className={styles.bottomArea}>
                {!expired && !matched && (
                    <div className={styles.timer}>
                        Time left: {Math.floor(timeLeft / 60)}:
                        {(timeLeft % 60).toString().padStart(2, "0")}
                    </div>
                )}

                {matched && ( null )}

                {expired && !matched && (
                    <div className={styles.reloadBlock}>
                        <div className={styles.timeUp}>
                            {wasPasted
                                ? "Please don't copy-paste. Play again?"
                                : "Time’s up! Play again?"
                            }
                        </div>
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

export default class RuleRetypeNoPaste extends Rule {
   constructor() {
        super("You must re-type your password in 1 minute.");

        this.isCorrect = false;

        this.renderItem = ({ pswd, setPswd, preventSort }) => (
            <RetypeNoPasteBox
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