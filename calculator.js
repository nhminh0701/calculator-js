const MAX_LETTER = 11;
const END_WITH_ZERO_PATTERN = /([0-9]*\.[0-9]*[1-9])0+$/;
const END_WITH_DOT_PATTERN = /([0-9]+)\.$/;

const OPERATORS = {
    'plus': '+',
    'minus': '-',
    'divide': '/',
    'multiply': '*'
}

class Calculator {
    // Hold value of 2 arguments in a list
    // when an operation executed, the list renewed with the result as the first argument
    constructor() {
        this.arguments = ['', ''];
        this.currentIndex = 0;
        this.result = 0;
        this.displayText = '';
        this.operator = '';
    }

    inputNumber(number) {
        // reset if selecting 2nd index without any operator
        if (this.currentIndex == 1 && this.operator == '') {
            this.arguments[0] = '';
            this.currentIndex = 0;
        }

        var currentArg = this.arguments[this.currentIndex];
        // if the letter already reached limmit -> ignore
        if (currentArg.length == MAX_LETTER) {
            return;
        }

        // if the input is 0 and length of letter = 0 -> ignore
        else if (currentArg.length == 0) {
            if (number == 0) {
                return;
            }

            if (number == '.') {
                currentArg = '0';
            }
        }

        // if the input is dot and there is already a dot -> ignore
        else if (currentArg.includes('.') && number == '.') {
            return;
        }
        
        currentArg += number;
        this.arguments[this.currentIndex] = currentArg;

        this.updateText();
    }

    cleanText() {
        for (let index = 0; index < 2; index++) {
            this.arguments[index] = this.arguments[index].replace(END_WITH_ZERO_PATTERN, '$1');
            this.arguments[index] = this.arguments[index].replace(END_WITH_DOT_PATTERN, '$1');
        }
    }

    executeOperation(operator) {
        // if selecting index == 0, store the operator and update selecting index
        // if selecting index == 1, execute the operation with storing operator
        //// set the result as the first argument
        //// clean the second argument
        //// set new operator
        //// reset selecting index
        this.cleanText();

        if (this.currentIndex == 0 && operator != 'equal') {
            this.operator = OPERATORS[operator];
            this.currentIndex = 1;
        } else {
            const args = [parseFloat(this.arguments[0]), parseFloat(this.arguments[1])]

            switch (this.operator) {
                case '+':
                    this.arguments[0] = (args[0] + args[1]).toString();
                    break;
                case '-':
                    this.arguments[0] = (args[0] + args[1]).toString();
                    break;
                case '/':
                    this.arguments[0] = (args[0] / args[1]).toString();
                    break;
                case '*':
                    this.arguments[0] = (args[0] * args[1]).toString();
                    break;
            }

            this.arguments[1] = '';
            if (operator == 'equal') {
                this.operator = '';
            } else {
                this.operator = OPERATORS[operator];
            }

            this.result = this.arguments[0];
        }

        this.updateText();
    }

    updateText() {
        return this.displayText = this.arguments.join(` ${this.operator} `);
    }

    reset() {
        this.arguments = ['', ''];
        this.currentIndex = 0;
        this.displayText = '';
        this.operator = '';
        this.result = 0;
    }
}