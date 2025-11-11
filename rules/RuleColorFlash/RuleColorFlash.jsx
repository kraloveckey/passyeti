import React from 'react';
import Rule from "../Rule";
import styles from "./RuleColorFlash.module.css";

const colorList = [
    { name: "red", hex: "#FF0000" },
    { name: "green", hex: "#00FF00" },
    { name: "blue", hex: "#0000FF" },
    { name: "yellow", hex: "#FFFF00" },
    { name: "purple", hex: "#800080" },
    { name: "orange", hex: "#FFA500" },
    { name: "black", hex: "#000000" },
    { name: "white", hex: "#FFFFFF" },
    { name: "pink", hex: "#FFC0CB" },
    { name: "brown", hex: "#A52A2A" },
    { name: "gray", hex: "#808080" },
    { name: "cyan", hex: "#00FFFF" },
    { name: "magenta", hex: "#FF00FF" },
    { name: "lime", hex: "#BFFF00" },
    { name: "teal", hex: "#008080" },
    { name: "navy", hex: "#000080" },
    { name: "silver", hex: "#C0C0C0" },
    { name: "gold", hex: "#FFD700" }
];

function FlashingBox({ hex }) {
    return (
        <div 
            className={styles.colorBox}
            style={{ backgroundColor: hex }}
        />
    );
}

export default class RuleColorFlash extends Rule {
    constructor() {
        super("Your password must include the name of this color:");

        this.color = colorList[Math.floor(Math.random() * colorList.length)];
        console.log("Color name:", this.color.name);
        
        this.renderItem = () => <FlashingBox hex={this.color.hex} />;
    }

    check = (txt) => {
        let r = new RegExp(this.color.name, "i");
        return r.test(txt);
    }
}