import Rule from "../Rule";

export default class RuleWordle extends Rule {
    constructor(solution) { 
        super("Your password must contain today's ");

        this.solution = solution;
        this.renderItem = () => <span><a href="https://www.nytimes.com/games/wordle/index.html" target="_blank">Wordle</a> answer.</span>
    }

    check(txt) {
        if (!this.solution || this.solution === "ERROR") {
            return false;
        }

        let r = new RegExp(`(${this.solution})`, "i");
        return r.test(txt); 
    }
}