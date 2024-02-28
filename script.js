const methods = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b
}

const firstNum = 5;
const secondNum = 3;
const operator = '+';

function operate(numA, operator, numB) {
    return methods[operator](numA, numB);
}