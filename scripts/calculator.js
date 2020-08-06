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
        this.state = {
            arguments: ['', ''],
            currentIndex: 0,
            result: 0,
            displayText: '',
            operator: ''
        }
    }

    inputNumber(number) {
        // reset if selecting 2nd index without any operator
        if (this.state.currentIndex == 1 && this.state.operator == '') {
            this.state.arguments[0] = '';
            this.state.currentIndex = 0;
        }

        var currentArg = this.state.arguments[this.state.currentIndex];
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
        this.state.arguments[this.state.currentIndex] = currentArg;

        this.updateText();
    }

    inputOperator(operator) {
        this.cleanText();

        if (this.state.currentIndex == 0 && operator != 'equal') {
            // store the operator and update selecting index
            this.state.operator = OPERATORS[operator];
            this.state.currentIndex = 1;
        } else {

            // Alow reinput operator
            if (this.state.arguments[1] == '' && operator != 'equal') {
                this.state.operator = OPERATORS[operator];
            } else {
                // execute the operation with storing operator
                // set the result as the first argument
                // clean the second argument
                // set new operator
                // reset selecting index
                this.state.arguments[0] = this.executeOperator(this.state.operator);

                this.state.arguments[1] = '';
                if (operator == 'equal') {
                    this.state.operator = '';
                } else {
                    this.state.operator = OPERATORS[operator];
                }

                this.state.result = this.state.arguments[0];
            }
        }

        this.updateText();
    }

    executeOperator(operator) {
        const args = [parseFloat(this.state.arguments[0]), parseFloat(this.state.arguments[1])]

        switch (operator) {
            case '+':
                return (args[0] + args[1]).toString();
            case '-':
                return (args[0] - args[1]).toString();
            case '/':
                return (args[0] / args[1]).toString();
            case '*':
                return (args[0] * args[1]).toString();
            default:
                throw Error('Invalid operator ' + operator);
        }
    }

    cleanText() {
        for (let index = 0; index < 2; index++) {
            this.state.arguments[index] = this.state.arguments[index].replace(END_WITH_ZERO_PATTERN, '$1');
            this.state.arguments[index] = this.state.arguments[index].replace(END_WITH_DOT_PATTERN, '$1');
        }
    }

    updateText() {
        return this.state.displayText = this.state.arguments.join(this.state.operator);
    }

    reset() {
        this.state.arguments = ['', ''];
        this.state.currentIndex = 0;
        this.state.displayText = '';
        this.state.operator = '';
        this.state.result = 0;
    }
}