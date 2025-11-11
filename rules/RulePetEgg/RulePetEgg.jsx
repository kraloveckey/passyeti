import React from 'react';
import Rule from "../Rule";
import '../RuleHatchedYeti/RuleHatchedYeti.css';

const YETI_EGG = "🥚";
const YETI_BABY = "🐣";
const YETI_ACHIEVEMENT = "MotherYeti🏆";

function EggDisplay({ correct }) {
    
    const eggClass = correct ? '' : 'yeti-sated';

    return (
        <div style={{fontSize: "50px", textAlign:"center", userSelect: "none"}} className={eggClass}>
            {YETI_EGG}
        </div>
    );
}

export default class RulePetEgg extends Rule {
    constructor() {
        super(`This is the Yeti egg. He is your unhatched pet. Keep him safe.`);
        
        this.renderItem = ({ correct }) => <EggDisplay correct={correct} />;
    }

    check = (txt) => {
        return txt.includes(YETI_EGG) || txt.includes(YETI_BABY) || txt.includes(YETI_ACHIEVEMENT);
    }
}