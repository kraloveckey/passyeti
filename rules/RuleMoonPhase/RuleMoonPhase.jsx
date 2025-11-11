import React from 'react';
import Rule from "../Rule";

const API_URL = 'https://wttr.in/Moon?format=%m';

async function getMoonPhase() {
    try {
        const response = await fetch('/api/moon');
        if (!response.ok) throw new Error('Moon API failed');
        
        const data = await response.json();
        console.log("Moon Phase:", data.moonEmoji);
        return data.moonEmoji;

    } catch (error) {
        console.error(error);
        return '🌘';
    }
}

export default class RuleMoonPhase extends Rule {
    constructor() {
        super("Your password must include the current phase of the moon as an emoji.");
        
        this.moonEmoji = '...';

        getMoonPhase().then(emoji => {
            this.moonEmoji = emoji.trim();
        });
    }

    check = (txt) => {
        return txt.includes(this.moonEmoji);
    }
}