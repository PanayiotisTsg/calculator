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

function getResult() {
    return (firstNum && operator && secondNum)
        ? (operate(firstNum, operator, secondNum) % 1)
            ? Math.round(operate(firstNum, operator, secondNum) * 100) / 100
            : operate(firstNum, operator, secondNum)
        : firstNum;
}

const mainDisplay = document.querySelector('.main-display');
const numButtons = document.querySelectorAll('.num');
numButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        mainDisplay.textContent = (mainDisplay.textContent === '0')
            ? e.target.textContent
            : mainDisplay.textContent + e.target.textContent;
        //mainDisplay.textContent += e.target.textContent;
        firstNum = mainDisplay.textContent.split(displayOperator)[0] || '0';
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
            result = getResult();
            console.log(result);
            mainDisplay.textContent = result;
            firstNum = result;
        }
        mainDisplay.textContent = (mainDisplay.textContent === '0' && e.target.textContent === '-')
            ? e.target.textContent
            : mainDisplay.textContent + e.target.textContent;
        //mainDisplay.textContent += e.target.textContent;
        displayOperator = e.target.textContent;
        operator = displayOperator === '×' ? '*' :
            displayOperator === '÷' ? '/' :
            displayOperator;
        console.log(`operator: ${operator}`);
    })
})

const equalsButton = document.querySelector('#equals');
equalsButton.addEventListener('click', (e) => {
    result = getResult();
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

    mainDisplay.textContent = '0';
})