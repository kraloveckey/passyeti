import Rule from "../Rule";

const dayNames = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday"
];

export default class RuleDayOfWeek extends Rule {
    constructor() {
        super(`Your password must include the current day of the week.`);

        const today = new Date();
        this.dayName = dayNames[today.getDay()];
        
        console.log("Current day:", this.dayName);
    }

    check = (txt) => {
        const r = new RegExp(this.dayName, "i");
        return r.test(txt);
    }
}