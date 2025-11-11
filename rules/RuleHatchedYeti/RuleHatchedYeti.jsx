import React, { useEffect, useRef } from 'react';
import Rule from "../Rule";
import './RuleHatchedYeti.css';

const YETI_EGG = "\u{1F95A}"; // 🥚
const YETI_BABY = "\u{1F423}"; // 🐣
const YETI_FOOD_SINGLE = "\u{1F41B}"; // 🐛
const YETI_FOOD_REGEX = /\u{1F41B}/gu; // 🐛
const YETI_FOOD_TIMER = "\u{1FAB0}"; // 🪰
const YETI_ADULT_IMG = "/passyeti-logo.png";
const YETI_ACHIEVEMENT = "MotherYeti🏆";
const YETI_FEED_GOAL = 3;

function YetiController({ ruleInstance, setPswd, correct }) {
    const timerRef = useRef(null);

    useEffect(() => {
        if (ruleInstance.stage === 2 && !ruleInstance.initialMealEaten) {
            const pswdBox = document.getElementById('pswdbox');
            if (pswdBox) {
                const currentPswd = pswdBox.value;
                const wormCount = (currentPswd.match(YETI_FOOD_REGEX) || []).length;

                if (wormCount >= 3) {
                    const newPswd = currentPswd
                        .replace(YETI_FOOD_SINGLE, "")
                        .replace(YETI_FOOD_SINGLE, "")
                        .replace(YETI_FOOD_SINGLE, "");
                    
                    ruleInstance.initialMealEaten = true;
                    setPswd(newPswd);
                }
            }
        }
    }, [ruleInstance.stage, setPswd, ruleInstance, ruleInstance.initialMealEaten]);

    useEffect(() => {
        if (ruleInstance.justFed) {
            ruleInstance.justFed = false;
            const pswdBox = document.getElementById('pswdbox');
            if (pswdBox) {
                const currentPswd = pswdBox.value;
                if (currentPswd.includes(YETI_FOOD_TIMER)) {
                    const newPswd = currentPswd.replace(YETI_FOOD_TIMER, "");
                    setPswd(newPswd);
                }
            }
        }
    }, [ruleInstance.justFed, setPswd, ruleInstance]);

    const onHungryCallbackRef = useRef();
    useEffect(() => {
        onHungryCallbackRef.current = () => {
            if (ruleInstance.isHungry) return;
            ruleInstance.isHungry = true;
            const pswdBox = document.getElementById('pswdbox');
            if (pswdBox) setPswd(pswdBox.value);
        };
    }); 

    useEffect(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        const hasFly = ruleInstance.hasFly;
        if (ruleInstance.stage === 2) {
            if (!ruleInstance.isHungry && !hasFly) {
                if (!ruleInstance.justFed) { 
                    ruleInstance.isHungry = false;
                }
                const onHungryTick = () => onHungryCallbackRef.current();
                timerRef.current = setInterval(onHungryTick, 45000);
            }
        }
        return () => clearInterval(timerRef.current);
    }, [ruleInstance.stage, ruleInstance.feedCount, ruleInstance, ruleInstance.isHungry, ruleInstance.hasFly]);
    
    const hasEgg = ruleInstance.hasEgg;
    const hasBaby = ruleInstance.hasBaby;
    const hasFly = ruleInstance.hasFly;
    const hasAchievement = ruleInstance.hasAchievement;

    let displayMsg = '';
    
    if (hasEgg && hasBaby) {
        displayMsg = `Yeti can't be an egg and a chick at the same time!`;
    } else if (ruleInstance.stage === 0) {
        displayMsg = `Hatch the egg as shown below:`;
    } else if (ruleInstance.stage === 1) {
        displayMsg = `Waiting for initial meal of 3 ${YETI_FOOD_SINGLE}...`;
    } else if (ruleInstance.stage === 2) {
        if (ruleInstance.isHungry) {
            displayMsg = `Yeti is hungry 😡 Feed him a ${YETI_FOOD_TIMER}`;
        } else if (ruleInstance.justFed) {
            displayMsg = `Yeti is happy 💖`;
        } else if (hasFly) {
            displayMsg = `Yeti is full 😋 Remove the ${YETI_FOOD_TIMER}`;
        } else {
            displayMsg = `Yeti is happy 💖`;
        }
    } else if (ruleInstance.stage === 3) {
        if (hasAchievement && hasBaby) {
            displayMsg = `Yeti has grown! You can remove the 🐣 now.`;
        } else {
            displayMsg = `Yeti grew up! Replace 🐣 with your reward: ${YETI_ACHIEVEMENT}`;
        }
    } else if (ruleInstance.stage === 4) {
        displayMsg = `Thank you for your care 💖 Keep ${YETI_ACHIEVEMENT} safe.`;
    }

    return (
        <div style={{ padding: "0", userSelect: "none" }}>
            <div style={{ minHeight: "20px", padding: "0" }}>
                {displayMsg}
            </div>
            <div style={{ textAlign: "center", paddingBottom: "10px" }}>
                {(ruleInstance.stage === 0 && !(hasEgg && hasBaby)) && (
                    <div style={{ fontSize: "50px", marginTop: "10px", userSelect: "none" }} className={correct ? '' : 'yeti-sated'}>
                        {YETI_EGG} &rarr; {YETI_BABY}
                    </div>
                )}
                {((ruleInstance.stage === 1) || (ruleInstance.stage === 0 && hasEgg && hasBaby)) && (
                     <div style={{ fontSize: "50px", marginTop: "10px" }} className={correct ? '' : 'yeti-sated'}>
                        {YETI_BABY}
                    </div>
                )}
                {ruleInstance.stage === 2 && (
                    <div 
                        style={{ fontSize: "50px", marginTop: "10px" }} 
                        className={(ruleInstance.isHungry) ? 'yeti-hungry' : (correct ? '' : 'yeti-sated')}
                    >
                        {YETI_BABY}
                    </div>
                )}
                {ruleInstance.stage === 3 && (
                    <img src={YETI_ADULT_IMG} alt="Adult Yeti" style={{ width: "60px", height: "auto", margin: "10px 0 0 0" }} />
                )}
                {ruleInstance.stage === 4 && (
                    <div style={{ fontSize: "50px", marginTop: "10px" }} className={correct ? '' : 'yeti-sated'}>
                        🏆
                    </div>
                )}
            </div>
        </div>
    );
}

export default class RuleHatchedYeti extends Rule {
    constructor() {
        super(' ');
        this.stage = 0;
        this.isHungry = false;
        this.feedCount = 0;
        this.justFed = false;
        this.initialMealEaten = false;
        this.hasEgg = false;
        this.hasBaby = false;
        this.hasFly = false;
        this.hasAchievement = false;
    }

    resetState = () => {
        this.stage = 0;
        this.isHungry = false;
        this.feedCount = 0;
        this.justFed = false;
        this.initialMealEaten = false;
    }

    renderItem = ({ setPswd, correct }) => {
        return <YetiController ruleInstance={this} setPswd={setPswd} correct={correct} />;
    };

    check = (txt) => {
        this.hasBaby = txt.includes(YETI_BABY);
        this.hasEgg = txt.includes(YETI_EGG);
        this.hasFly = txt.includes(YETI_FOOD_TIMER);
        this.hasAchievement = txt.includes(YETI_ACHIEVEMENT);

        if (this.stage === 4) {
            if (!this.hasAchievement) {
                this.resetState();
                return false;
            }
            return true;
        }

        if (this.stage === 3) {
            if (this.hasAchievement && !this.hasBaby) {
                this.stage = 4;
                return true;
            }
            if (this.hasAchievement && this.hasBaby) {
                return false;
            }
            if (!this.hasAchievement && !this.hasBaby) {
                return false;
            }
            return false;
        }

        if (this.stage >= 1 && this.stage < 3 && !this.hasBaby) {
            this.resetState();
        }
        
        if (this.stage < 2 && this.hasEgg) {
            if (this.stage !== 0) this.resetState();
            this.stage = this.hasBaby ? 1 : 0;
            return false;
        }

        if (this.stage < 2 && this.hasBaby && !this.hasEgg) {
            const wormCount = (txt.match(YETI_FOOD_REGEX) || []).length;
            if (wormCount >= 3) {
                this.stage = 2;
            } else {
                this.stage = 1;
                return false;
            }
        }

        if (this.stage === 2) {
            if (this.isHungry) {
                if (this.hasFly) {
                    this.isHungry = false;
                    this.feedCount += 1;
                    this.justFed = true;
                    if (this.feedCount >= YETI_FEED_GOAL) {
                        this.stage = 3;
                    }
                    return true;
                }
                return false;
            } else {
                if (this.hasFly) return false; 
                return true;
            }
        }

        if (this.stage < 2 && !this.hasEgg && !this.hasBaby) {
             this.resetState();
             return false;
        }
        
        return false;
    };
}