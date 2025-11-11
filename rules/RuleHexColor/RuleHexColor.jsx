import React, { useState, useRef } from 'react';
import Rule from "../Rule";
import ReloadButton from '../../components/ReloadButton';
import styles from './RuleHexColor.module.css';

function getRandomHex() {
    const hex = Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    return '#' + hex.toUpperCase();
}

function HexColorBox({ hex, onRegenerate, correct }) {
    const [reloadsLeft, setReloadsLeft] = useState(3);

    return (
        <div className={styles.inlineWrapper}>
            <div 
                className={styles.colorBlock}
                style={{ backgroundColor: hex }}
            />
            <ReloadButton
                onClick={() => {
		    if (reloadsLeft > 0) {
                        onRegenerate();
                        setReloadsLeft(reloadsLeft - 1);
                    }
                }}
                hidden={correct}
                reloadsLeft={reloadsLeft}
		showLastReload={true}
            />
        </div>
    );
}

export default class RuleHexColor extends Rule {
    constructor() {
        super("Your password must include this color's hex code:");
        
        this.hexCode = getRandomHex();
        console.log("Hex Color:", this.hexCode);
        
        this.renderItem = (props) => {
            const { regenerateRule, num, correct } = props;

            return (
                <HexColorBox
                    hex={this.hexCode}
                    onRegenerate={() => regenerateRule(num)}
                    correct={correct}
                />
            );
        };
    }

    regenerate = () => {
        this.hexCode = getRandomHex();
        console.log("Hex Color Regenerated:", this.hexCode);
    }

    check = (txt) => {
        let r = new RegExp(this.hexCode, "i");
        return r.test(txt);
    }
}