const displayField = document.querySelector('#display');

const calculator = new Calculator();

const numbBtns = document.querySelectorAll('.numb');

for (let i = 0; i < numbBtns.length; i++) {
    numbBtns[i].addEventListener('click', () => {
        calculator.inputNumber(numbBtns[i].textContent);
        displayField.value = calculator.state.displayText;
    });
}

const operators = document.querySelectorAll('.operator');

for (let i = 0; i < operators.length; i++) {
    operators[i].addEventListener('click', () => {
        calculator.inputOperator(operators[i].id);
        displayField.value = calculator.state.displayText;
    });
}

document.querySelector('#clear').addEventListener('click', () => {
    calculator.reset();
    displayField.value = calculator.state.displayText;
});