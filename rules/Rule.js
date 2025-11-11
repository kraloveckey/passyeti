export default class Rule {
    constructor(msg, check) {
        this.msg = msg;
        this.correct = false;
        this.unlocked = false;

        if(check!==undefined) {
            this.check = check;
        }
    }
    check(txt, propsToChild) {
        return false; 
    }
    setRuleNumber(num) {
        this.num = num;
    }
}