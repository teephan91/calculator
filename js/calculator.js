function add(a, b) {
    let sum = +a + +b;
    return sum;
}

function subtract(a, b) {
    let difference = a - b;
    return difference;
}

function multiply(a, b) {
    let product = a * b;
    return product;
}

function divide(a, b) {
    let quotient = a / b;
    return quotient;
}

const numberBtns = document.querySelectorAll('.number');
const display = document.querySelector('.display');
let temp = 0;

startStoringFirstNumber();

function startStoringFirstNumber() {
    for (let numberBtn of numberBtns) {
        numberBtn.addEventListener('click', storeFirstNumber);  
}
}

function stopStoringFirstNumber() {
    for (let numberBtn of numberBtns) {
        numberBtn.removeEventListener('click', storeFirstNumber);  
}
}

function storeFirstNumber() {
    display.textContent += this.textContent;
    temp = +display.textContent;
}

const operators = document.querySelectorAll('.operator');
let temp2;

for (let operator of operators) {
    operator.addEventListener('click', () => {
        temp2 = operator.textContent;
        stopStoringFirstNumber();
        startStoringSecondNumber();
    });  
}

let temp3 = 0;

function startStoringSecondNumber() {
    display.textContent = "";
    for (let numberBtn of numberBtns) {
        numberBtn.addEventListener('click', storeSecondNumber);
    }
}

function stopStoringSecondNumber() {
    for (let numberBtn of numberBtns) {
        numberBtn.removeEventListener('click', storeSecondNumber);
    }
}

function storeSecondNumber() {
    display.textContent += this.textContent;
    temp3 = +display.textContent;
}

const solutionBtn = document.querySelector('.solution');

solutionBtn.addEventListener('click', operate);

function operate(a, b, operator) {
    a = temp;
    c = temp2;
    b = temp3;
    
    if (c === '+') {
        operator = add(a, b);
    } else if (c === '-') {
        operator = subtract(a, b);
    } else if (c === 'x') {
        operator = multiply(a, b);
    } else if (c === '/') {
        operator = divide(a, b);
    }

    return display.textContent = operator;
}

const clearBtn = document.querySelector('.clear');

clearBtn.addEventListener('click', () => {
    display.textContent = "";
    temp = 0;
    temp2 = "";
    temp3 = 0;
    stopStoringSecondNumber();
    startStoringFirstNumber();
});