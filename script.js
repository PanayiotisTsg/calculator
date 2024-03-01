const methods = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b
}

let firstNum;
let secondNum;
let operator;
let displayOperator;
let result;


function operate(numA, operator, numB) {
    return methods[operator](+numA, +numB);
}

const mainDisplay = document.querySelector('.main-display');
const numButtons = document.querySelectorAll('.num');
numButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        mainDisplay.textContent += e.target.textContent;
        firstNum = mainDisplay.textContent.split(displayOperator)[0];
        secondNum = mainDisplay.textContent.split(displayOperator)[1];
        console.log(`first num: ${firstNum}`);
        console.log(`second num: ${secondNum}`);
    });
})

const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        //For multiple operation case
        if (operator) {
            result = operate(firstNum, operator, secondNum);
            result = (result % 1) ? Math.round(result * 100) / 100 : result;
            mainDisplay.textContent = result;
            firstNum = result;
        }
        mainDisplay.textContent += e.target.textContent;
        displayOperator = e.target.textContent;
        operator = displayOperator === '×' ? '*' :
            displayOperator === '÷' ? '/' :
            displayOperator;
        console.log(`operator: ${operator}`);
    })
})

const equalsButton = document.querySelector('#equals');
equalsButton.addEventListener('click', (e) => {
    result = (firstNum && secondNum && operator) ? operate(firstNum, operator, secondNum) : firstNum;
    console.log(result);
    result = (result % 1) ? Math.round(result * 100) / 100 : result;
    mainDisplay.textContent = result;
    firstNum = result;
    operator = null;
    secondNum = null;
})

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', () => {
    firstNum = null;
    secondNum = null;
    operator = null;
    result = null;

    mainDisplay.textContent = '';
})