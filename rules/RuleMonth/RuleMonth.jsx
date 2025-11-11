import Rule from "../Rule";

const monthNames = [
    "january", 
    "february", 
    "march", 
    "april", 
    "may", 
    "june",
    "july", 
    "august", 
    "september", 
    "october", 
    "november", 
    "december"
];

export default class RuleMonth extends Rule {
    constructor() {
        super(`Your password must include the current month.`);

        const today = new Date();
        this.monthName = monthNames[today.getMonth()];
        
        console.log("Current month:", this.monthName);
    }

    check = (txt) => {
        const r = new RegExp(this.monthName, "i");
        return r.test(txt);
    }
}