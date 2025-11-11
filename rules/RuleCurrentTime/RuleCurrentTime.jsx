import Rule from "../Rule";

function get12Hour() {
    const d = new Date();
    let h = d.getHours();
    h = h % 12;
    h = h ? h : 12;
    
    return h.toString().padStart(2, '0');
}

export default class RuleCurrentTime extends Rule {
    constructor() {
        super("Your password must include the current hour (01-12).");
        
        this.hour = get12Hour();
        console.log("Current hour:", this.hour);
    }

    check = (txt) => {
        return txt.includes(this.hour);
    }
}