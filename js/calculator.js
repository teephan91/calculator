// 4 basic math operations.
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

// operate() will call on the 4 basic operations functions.
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
        if (b === 0) {
            return alert('Math ERROR! Please enter the number again.');
        } else operator = divide(a, b);
    }

    firstNumber = operator;

    return display.textContent = roundAnswer(operator);
}

// roundAnswer() will round out the result of operate() to 5 decimal pts.
function roundAnswer(answer) {
    if (Number.isInteger(answer)) {
        return answer;
    } else {
        return parseFloat(answer.toFixed(5));
    }
}

// updateName() will update firstNumber & secondNumber to ensure
// they're up to date in case users make mistakes and delete some
// digits.
function updateNumber() {
    return +display.textContent;
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

const decimalBtn = document.querySelector('.decimal-point');
// decimal point
startAddDecimalPoint();

function startAddDecimalPoint() {
    decimalBtn.addEventListener('click', addDecimalPoint);
}

function stopAddDecimalPoint() {
    decimalBtn.removeEventListener('click', addDecimalPoint);
}

function addDecimalPoint() {
    display.textContent += this.textContent;
    stopAddDecimalPoint();
}

// this is A SPECIAL CASE for when users don't input the integer portion
// before clicking ".".
// the integer portion is assumed to be "0".
function startAddSpecialDecimalPoint() {
    decimalBtn.addEventListener('click', addSpecialDecimalPoint);
}

function stopAddSpecialDecimalPoint() {
    decimalBtn.removeEventListener('click', addSpecialDecimalPoint);
}

function addSpecialDecimalPoint() {
    display.textContent = "";
    display.textContent += this.textContent;
    stopAddSpecialDecimalPoint();
    stopAddDecimalPoint();
    stop1stDigitSecondNumber();
    startStoringSecondNumber();
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
    stopAddDecimalPoint();
    stopStoringFirstNumber();
    startAddSpecialDecimalPoint();
    start1stDigitSecondNumber();
    firstNumber = updateNumber();
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
    stopAddSpecialDecimalPoint();
    startAddDecimalPoint();
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
    secondNumber = updateNumber();
    let result2ndOperator = operate();
    if (result2ndOperator === undefined) {
        stopStoringSecondNumber();
        start1stDigitSecondNumber();
        startAddSpecialDecimalPoint();
    } else {
        inputOperator = this.textContent;
        stopStoringSecondNumber();
        start1stDigitSecondNumber();
        startAddSpecialDecimalPoint();
    }
}

const solutionBtn = document.querySelector('.solution');
// "=" or SOLUTION button.
solutionBtn.addEventListener('click', () => {
    if ((secondNumber === undefined) || (inputOperator === undefined)) {
        alert('Missing some inputs. Please enter those before clicking "=" button.');
    } else {
        secondNumber = updateNumber();
        let resultSolutionBtn = operate();
        if (resultSolutionBtn === undefined) {
            start1stDigitSecondNumber();
            startAddSpecialDecimalPoint();
        } else {
            stopStoring2ndOperator();
            startStoring1stOperator();
        }
    }
});

const clearBtn = document.querySelector('.clear');
// "C" or CLEAR button
clearBtn.addEventListener('click', () => {
    display.textContent = "";
    firstNumber = 0;
    inputOperator = void 0;
    secondNumber = void 0;
    stop1stDigitSecondNumber();
    stopStoringSecondNumber();
    stopStoring2ndOperator();
    startStoringFirstNumber();
    startAddDecimalPoint();
    startStoring1stOperator();
});

const deleteBtn = document.querySelector('.delete');
// "Del" or DELETE button
deleteBtn.addEventListener('click', () => {
    display.textContent = display.textContent.slice(0, -1);
});