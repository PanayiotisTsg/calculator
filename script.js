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
let clickEvent = new Event('click');
let clickClear = new Event('click');
let isKeyDown = false;
let lastKeyDown;

function operate(numA, operator, numB) {
    return methods[operator](+numA, +numB);
}

function getResult() {
    // If user doesn't enter all 3 parts of the expression
    return (firstNum && operator && secondNum)
        // If the result is a float number, round to 2 decimal places
        ? (operate(firstNum, operator, secondNum) % 1)
            ? Math.round(operate(firstNum, operator, secondNum) * 100) / 100
            : operate(firstNum, operator, secondNum)
        : firstNum;
}

const historyDisplay = document.querySelector('.history-display');
const mainDisplay = document.querySelector('.main-display');
const numButtons = document.querySelectorAll('.num');
numButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        switch (mainDisplay.textContent) {
            case '0':
                mainDisplay.textContent = e.target.textContent;
                break;
            case `${result}`:
                mainDisplay.textContent = e.target.textContent;
                result = null;
                pointButton.addEventListener('click', displayPoint);
                break;
            default:
                mainDisplay.textContent += e.target.textContent;
        }
        firstNum = result || mainDisplay.textContent.split(displayOperator)[0] || '0';
        secondNum = mainDisplay.textContent.split(displayOperator).at(-1);
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
            console.log(`result: ${result}`);
            historyDisplay.textContent = mainDisplay.textContent + ' =';
            mainDisplay.textContent = result;
            firstNum = result;
        }
        //If user press '-' before any number it will show '-num' instead of '0-num'
        mainDisplay.textContent = (mainDisplay.textContent === '0' && e.target.textContent === '-')
            ? e.target.textContent
            : mainDisplay.textContent + e.target.textContent;
        displayOperator = e.target.textContent;
        operator = (displayOperator === '×') ? '*' :
            (displayOperator === '÷') ? '/' :
            displayOperator;
        secondNum = null;
        pointButton.addEventListener('click', displayPoint);
        console.log(`operator: ${operator}`);
    })
})

const equalsButton = document.querySelector('#equals');
equalsButton.addEventListener('click', (e) => {
    result = getResult();
    
    historyDisplay.textContent = mainDisplay.textContent + ' =';
    mainDisplay.textContent = result;

    firstNum = result;
    operator = null;
    secondNum = null;

    pointButton.removeEventListener('click', displayPoint);
})

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', () => {
    firstNum = null;
    secondNum = null;
    operator = null;
    result = null;

    mainDisplay.textContent = '0';
    historyDisplay.textContent = '';

    pointButton.addEventListener('click', displayPoint);
})

function displayPoint(e) {
    mainDisplay.textContent += e.target.textContent;
    pointButton.removeEventListener('click', displayPoint);
}

const pointButton = document.querySelector('.point');
pointButton.addEventListener('click', displayPoint);

const deleteButton = document.querySelector('#delete');
deleteButton.addEventListener('click', () => {
    let undeletableValues = ['Infinity', '-Infinity', `${result}`];
    if (
        undeletableValues.includes(mainDisplay.textContent) ||
        mainDisplay.textContent.length === 1
    ) {
        clearButton.dispatchEvent(clickClear);
    } else {
        mainDisplay.textContent = mainDisplay.textContent.slice(0, -1);
    }
})

window.addEventListener('keydown', (e) => {
    if (isKeyDown && lastKeyDown === e.key) return;
    isKeyDown = true;
    lastKeyDown = e.key;

    const calculatorBtn = document.querySelector(`button[data-key='${e.key}']`);
    if (!calculatorBtn) return;

    calculatorBtn.dispatchEvent(clickEvent);

    // Add pressing animation
    calculatorBtn.classList.add('pressed');
    // Remove animation
    calculatorBtn.addEventListener('transitionend', (e) => {
        if (e.propertyName === 'color') {
            console.log(e.propertyName);
            calculatorBtn.classList.remove('pressed');
        }
    })
})

window.addEventListener('keyup', () => {
    isKeyDown = false;
})