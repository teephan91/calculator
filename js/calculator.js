// 4 basic math operations.
function add(a, b) {
    return +a + +b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

// operate() will call on the 4 basic operations functions.
function operate(a, b, c) {
    let result;
    a = firstNumber;
    b = secondNumber;
    c = inputOperator;

    if (c === '+') {
        result = add(a, b);
    } else if (c === '-') {
        result = subtract(a, b);
    } else if (c === 'x') {
        result = multiply(a, b);
    } else if (c === '/') {
        if (b === 0) {
            topScreen.textContent = "MATH ERROR! Enter again.";
            topScreen.style.textAlign = 'center';
            return undefined;
        } else result = divide(a, b);
    }

    firstNumber = result;

    return numbersDisplay.textContent = roundAnswer(result);
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
    return +numbersDisplay.textContent;
}

// Top screen
const topScreen = document.querySelector('.top-screen');

// tempNumber is used to store firstNumber before it gets updated
// from operate(). The purpose is to display the previous firstNumber
// on top screen.
let tempNumber;

const numberBtns = document.querySelectorAll('.number');
const numbersDisplay = document.querySelector('.numbers-display');
let firstNumber = 0;
// 1st DIGIT FIRST NUMBER
start1stDigitFirstNumber();

function start1stDigitFirstNumber() {
    for (let numberBtn of numberBtns) {
        numberBtn.addEventListener('click', store1stDigitFirstNumber);
    }
}

function stop1stDigitFirstNumber() {
    for (let numberBtn of numberBtns) {
        numberBtn.removeEventListener('click', store1stDigitFirstNumber);
    }
}

function store1stDigitFirstNumber() {
    topScreen.textContent = "";
    numbersDisplay.textContent = "";
    numbersDisplay.textContent += this.textContent;
    stop1stDigitFirstNumber();
    startStoringFirstNumber();
    stopAddSpecialDecimalPoint1stNumber();
}

// FIRST NUMBER
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
    numbersDisplay.textContent += this.textContent;
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
    numbersDisplay.textContent += this.textContent;
    stopAddDecimalPoint();
}

// this is A SPECIAL CASE for when users don't input the integer portion
// before clicking ".".
// the integer portion is assumed to be "0".

// for 1st Number
startAddSpecialDecimalPoint1stNumber();

function startAddSpecialDecimalPoint1stNumber() {
    decimalBtn.addEventListener('click', addSpecialDecimalPoint1stNumber);
}

function stopAddSpecialDecimalPoint1stNumber() {
    decimalBtn.removeEventListener('click', addSpecialDecimalPoint1stNumber);
}

function addSpecialDecimalPoint1stNumber() {
    topScreen.textContent = "";
    numbersDisplay.textContent = "";
    numbersDisplay.textContent += this.textContent;
    stopAddSpecialDecimalPoint1stNumber();
    stopAddDecimalPoint();
    stop1stDigitFirstNumber();
    startStoringFirstNumber();
}

// for 2nd Number
function startAddSpecialDecimalPoint2ndNumber() {
    decimalBtn.addEventListener('click', addSpecialDecimalPoint2ndNumber);
}

function stopAddSpecialDecimalPoint2ndNumber() {
    decimalBtn.removeEventListener('click', addSpecialDecimalPoint2ndNumber);
}

function addSpecialDecimalPoint2ndNumber() {
    topScreen.textContent = "";
    numbersDisplay.textContent = "";
    numbersDisplay.textContent += this.textContent;
    stopAddSpecialDecimalPoint2ndNumber();
    stopAddDecimalPoint();
    stop1stDigitSecondNumber();
    startStoringSecondNumber();
}

const operators = document.querySelectorAll('.operator');
const operatorsDisplay = document.querySelector('.operators-display');
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
    topScreen.textContent = "";
    operatorsDisplay.textContent = "";
    operatorsDisplay.textContent += this.textContent;
    inputOperator = this.textContent;
    stopAddDecimalPoint();
    stop1stDigitFirstNumber();
    stopStoringFirstNumber();
    stopAddSpecialDecimalPoint1stNumber();
    startAddSpecialDecimalPoint2ndNumber();
    start1stDigitSecondNumber();
    firstNumber = updateNumber();
    tempNumber = updateNumber();
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
    topScreen.textContent = "";
    numbersDisplay.textContent = "";
    numbersDisplay.textContent += this.textContent;
    secondNumber = updateNumber();
    stop1stDigitSecondNumber();
    startStoringSecondNumber();
    stopAddSpecialDecimalPoint2ndNumber();
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
    numbersDisplay.textContent += this.textContent;
    secondNumber = updateNumber();
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
    operatorsDisplay.textContent = "";
    operatorsDisplay.textContent += this.textContent;
    secondNumber = updateNumber();
    let result2ndOperator = operate();
    if (result2ndOperator === undefined) {
        stopStoringSecondNumber();
        start1stDigitSecondNumber();
        startAddSpecialDecimalPoint2ndNumber();
    } else {
        topScreen.textContent = `${tempNumber} ${inputOperator} ${secondNumber} =`;
        topScreen.style.textAlign = 'right';
        tempNumber = firstNumber;
        inputOperator = this.textContent;
        stopStoringSecondNumber();
        start1stDigitSecondNumber();
        startAddSpecialDecimalPoint2ndNumber();
    }
}

const solutionBtn = document.querySelector('.solution');
// "=" or SOLUTION button.
solutionBtn.addEventListener('click', () => {
    if ((secondNumber === undefined) || (inputOperator === undefined)) {
        topScreen.textContent = 'Missing some inputs.';
        topScreen.style.textAlign = 'center';
    } else {
        secondNumber = updateNumber();
        let resultSolutionBtn = operate();
        if (resultSolutionBtn === undefined) {
            start1stDigitSecondNumber();
            startAddSpecialDecimalPoint2ndNumber();
        } else {
            operatorsDisplay.textContent = "";
            topScreen.textContent = `${tempNumber} ${inputOperator} ${secondNumber} =`;
            topScreen.style.textAlign = 'right';
            stopStoringSecondNumber();
            start1stDigitFirstNumber();
            startAddSpecialDecimalPoint1stNumber();
            startAddDecimalPoint();
            stopStoring2ndOperator();
            startStoring1stOperator();
        }
    }
});

const clearBtn = document.querySelector('.clear');
// "C" or CLEAR button
clearBtn.addEventListener('click', () => {
    topScreen.textContent = "";
    numbersDisplay.textContent = "0";
    operatorsDisplay.textContent = "";
    firstNumber = 0;
    inputOperator = void 0;
    secondNumber = void 0;
    stop1stDigitSecondNumber();
    stopStoringSecondNumber();
    stopStoring2ndOperator();
    start1stDigitFirstNumber();
    startAddSpecialDecimalPoint1stNumber();
    startAddDecimalPoint();
    startStoring1stOperator();
});

const deleteBtn = document.querySelector('.delete');
// "Del" or DELETE button
deleteBtn.addEventListener('click', () => {
    numbersDisplay.textContent = numbersDisplay.textContent.slice(0, -1);
    if (numbersDisplay.textContent.includes(".")) {
        stopAddDecimalPoint();
    } else startAddDecimalPoint();
});

document.addEventListener('keydown', handleKeyBoardEvent);
// Keyboard support
function handleKeyBoardEvent(keyboardEvent) {
    switch (keyboardEvent.key) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            triggerClickEvent(numberBtns, keyboardEvent.key);
            break;
        case "+":
        case "-":
        case "/":
            triggerClickEvent(operators, keyboardEvent.key);
            break;
        case "*":
            operators.forEach((operator) => {
                if (operator.textContent === "x") {
                    operator.click();
                }
            });
            break;
        case ".":
            decimalBtn.click();
            break;
        case "Delete":
        case "Backspace":
            deleteBtn.click();
            break;
        case "=":
        case "Enter":
            solutionBtn.click();
            break;
        case "c":
            clearBtn.click();
    }
}

// triggerClickEvent() will trigger the 'click' event listener on the
// HTML buttons when users press on the equivalent keys on the keyboard.
function triggerClickEvent(elements, keyboard) {
    elements.forEach((element) => {
        if (element.textContent === keyboard) {
            element.click();
        }
    });
}