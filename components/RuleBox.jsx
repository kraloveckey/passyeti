import React from 'react';
import "./RuleBox.css";
import Image from 'next/image';

function RuleBox({heading, msg, correct, renderItem, propsToChild, className}) {
    return ( 
    <div className={`rulebox ${correct? "rule-correct": "rule-err" } ${className || ''}`}>
            <div className={`rulebox-top ${correct? "rule-correct": "rule-err" }`}>
                {correct ? (
                    <Image src="/chekmark.svg" width={19} height={19} alt="Check" className="rule-icon" />
                ) : (
                    <Image src="/error.svg" width={19} height={19} alt="Error" className="rule-icon" />
                )}
                {heading}

            </div>
            <div className="rulebox-desc">
                {msg}
                {renderItem===undefined? null: renderItem(propsToChild)}
            </div>
        </div>
    );
}

export default RuleBox;