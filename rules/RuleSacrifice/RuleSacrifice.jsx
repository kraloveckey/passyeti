import React, { useState } from 'react';
import Rule from "../Rule";
import styles from "./RuleSacrifice.module.css";

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function SacrificePicker({ onSacrifice, pswd, setPswd }) {
    const [sacrificed, setSacrificed] = useState([]);

    const pickLetter = (letter) => {
        if (sacrificed.length < 2) {
            const newSacrificed = [...sacrificed, letter];
            setSacrificed(newSacrificed);
            
            if (newSacrificed.length === 2) {
                onSacrifice(newSacrificed);
                setPswd(pswd); 
            }
        }
    };

    const isDisabled = sacrificed.length >= 2;

    return (
        <div className={styles.sacrificeContainer}>
            {ALPHABET.map(letter => {
                const isSacrificed = sacrificed.includes(letter);
                const buttonClass = styles.letterButton + (isSacrificed ? ' ' + styles.sacrificed : '');

                return (
                    <button 
                        key={letter}
                        className={buttonClass}
                        onClick={() => pickLetter(letter)}
                        disabled={isDisabled || isSacrificed}
                    >
                        {letter}
                    </button>
                );
            })}
        </div>
    );
}

export default class RuleSacrifice extends Rule {
    constructor() {
        super("A sacrifice must be made. Pick 2 letters you will no longer be able to use.");
        
        this.sacrificedLetters = [];
        this.regex = null;

        this.renderItem = ({ pswd, setPswd }) => (
            <SacrificePicker
                pswd={pswd}
                setPswd={setPswd}
                onSacrifice={(letters) => {
                    this.sacrificedLetters = letters;
                    this.regex = new RegExp('[' + letters.join('') + ']', "i");
                }} 
            />
        );
    }

    check = (txt) => {
        if (this.sacrificedLetters.length < 2) {
            return false;
        }
        
        return !this.regex.test(txt);
    }
}