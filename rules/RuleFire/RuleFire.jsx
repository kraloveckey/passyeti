import React, { useEffect, useRef } from 'react';
import Rule from "../Rule";

const FIRE_EMOJI = "\u{1F525}";

export default class RuleFire extends Rule {
    constructor() {
        super("Oh no! Your password is on fire! Put it out!");
        
        this.hasFireStarted = false;

        this.renderItem = ({ pswd, setPswd, correct }) => {
            return (
                <Fire 
                    pswd={pswd}
                    setPswd={setPswd}
                    correct={correct}
                />
            )
        }
    }

    check(txt) {
        if (!this.hasFireStarted) {
            this.hasFireStarted = true;
            return false;
        }
        
        return !txt.match(/\u{1F525}/u);
    }
}

function Fire({ pswd, setPswd, correct }) {
    const timerRef = useRef(null);
    const solvedOnce = useRef(false);

    useEffect(() => {
        clearTimeout(timerRef.current);
        
        if (!correct && !solvedOnce.current) {
            timerRef.current = setTimeout(addFire, 2000);
        }

        return () => clearTimeout(timerRef.current);
    }, [pswd, correct]);

    useEffect(() => {
        if (correct) {
            solvedOnce.current = true;
            clearTimeout(timerRef.current);
        }
    }, [correct]);

    function addFire() {
        if (solvedOnce.current) return;

        const pswdArray = [...pswd];
        const pos = Math.floor(Math.random() * (pswdArray.length + 1));
        pswdArray.splice(pos, 0, FIRE_EMOJI);
        setPswd(pswdArray.join(""));
    }
    
    return null;
}