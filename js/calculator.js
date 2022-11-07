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
let firstNumber = 0;
// FIRST NUMBER
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
    firstNumber = +display.textContent;
}

const operators = document.querySelectorAll('.operator');
let inputOperator;
// 1st OPERATOR
startStoring1stOperator();

function startStoring1stOperator() {
    for (let operator of operators) {
        operator.addEventListener('click', store1stOperator);
    }
}

function stopStoring1stOperator() {
    for (let operator of operators) {
        operator.removeEventListener('click', store1stOperator);
    }
}

function store1stOperator() {
    inputOperator = this.textContent;
    stopStoringFirstNumber();
    start1stDigitSecondNumber();
}

let secondNumber;
// 1st DIGIT SECOND NUMBER
function start1stDigitSecondNumber() {
    for (let numberBtn of numberBtns) {
        numberBtn.addEventListener('click', store1stDigitSecondNumber);
    }
}

function stop1stDigitSecondNumber() {
    for (let numberBtn of numberBtns) {
        numberBtn.removeEventListener('click', store1stDigitSecondNumber);
    }
}

function store1stDigitSecondNumber() {
    display.textContent = "";
    display.textContent += this.textContent;
    secondNumber = +display.textContent;
    stop1stDigitSecondNumber();
    startStoringSecondNumber();
    stopStoring1stOperator();
    startStoring2ndOperator();
}

// SECOND NUMBER
function startStoringSecondNumber() {  
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
    secondNumber = +display.textContent;
    stopStoring1stOperator();
    startStoring2ndOperator();
}

// 2nd OPERATOR
function startStoring2ndOperator() {
    for (let operator of operators) {
        operator.addEventListener('click', store2ndOperator);
    }
}

function stopStoring2ndOperator() {
    for (let operator of operators) {
        operator.removeEventListener('click', store2ndOperator);
    }
}

function store2ndOperator() {
    operate();
    inputOperator = this.textContent;
    stopStoringSecondNumber();
    start1stDigitSecondNumber();
}

const solutionBtn = document.querySelector('.solution');

solutionBtn.addEventListener('click', () => {
    if ((secondNumber === undefined) || (inputOperator === undefined)) {
        alert('Missing some inputs. Please enter those before clicking "=" button.');
    } else {
        operate();
        stopStoring2ndOperator();
        startStoring1stOperator();
    }
});

function operate(a, b, operator) {
    a = firstNumber;
    b = secondNumber;
    c = inputOperator;
     
    if (c === '+') {
        operator = add(a, b);
    } else if (c === '-') {
        operator = subtract(a, b);
    } else if (c === 'x') {
        operator = multiply(a, b);
    } else if (c === '/') {
        operator = divide(a, b);
    }

    firstNumber = operator;

    return display.textContent = roundAnswer(operator);
}

const clearBtn = document.querySelector('.clear');

clearBtn.addEventListener('click', () => {
    display.textContent = "";
    firstNumber = 0;
    inputOperator = "";
    secondNumber = 0;
    stop1stDigitSecondNumber();
    stopStoringSecondNumber();
    stopStoring2ndOperator();
    startStoringFirstNumber();
    startStoring1stOperator();
});

function roundAnswer(answer) {
    if (Number.isInteger(answer)) {
        return answer;
    } else {
        return parseFloat(answer.toFixed(5));
    }
}