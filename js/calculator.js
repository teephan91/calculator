const powerBtn = document.querySelector('.power-off');
const topScreen = document.querySelector('.top-screen');
const numbersDisplay = document.querySelector('.numbers-display');
const operatorsDisplay = document.querySelector('.operators-display');
const numberBtns = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const decimalBtn = document.querySelector('.decimal-point');
// allBtns except powerBtn
const allBtns = Array.from(document.querySelectorAll('button'))
                     .filter(btn => btn.className !== 'power-off');

startTurnOnCalculator();

function startTurnOnCalculator() {
    powerBtn.addEventListener('click', calculatorOn);
}

function stopTurnOnCalculator() {
    powerBtn.removeEventListener('click', calculatorOn);
}

function calculatorOn() {
    allBtns.forEach(btn => btn.disabled = false);
    start1stDigitFirstNumber();
    startAddDecimalPoint();
    startAddSpecialDecimalPoint1stNumber();
    startStoring1stOperator();
    stopTurnOnCalculator();
    startTurnOffCalculator();
    numbersDisplay.textContent = '0';
    powerBtn.textContent = 'ON';
    powerBtn.classList.remove('power-off');
    powerBtn.classList.add('power-on');
}

function startTurnOffCalculator() {
    powerBtn.addEventListener('click', calculatorOff);
}

function stopTurnOffCalculator() {
    powerBtn.removeEventListener('click', calculatorOff);
}

function calculatorOff() {
    allBtns.forEach(btn => btn.disabled = true);
    stopTurnOffCalculator();
    startTurnOnCalculator();
    clearCalculator();
    topScreen.textContent = '';
    numbersDisplay.textContent = '';
    operatorsDisplay.textContent = '';
    powerBtn.textContent = 'OFF';
    powerBtn.classList.remove('power-on');
    powerBtn.classList.add('power-off');
}

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
    return (Number.isInteger(answer)) ? answer : parseFloat(answer.toFixed(5));  
}

// updateName() will update firstNumber & secondNumber to ensure
// they're up to date in case users make mistakes and delete some
// digits.
function updateNumber() {
    return (numbersDisplay.textContent === ".") ? 0 : +numbersDisplay.textContent;
}

// tempNumber is used to store firstNumber before it gets updated
// from operate(). The purpose is to display the previous firstNumber
// on top screen.
let tempNumber;

let firstNumber = 0;
// 1st DIGIT FIRST NUMBER
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

// decimal point
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
    secondNumber = updateNumber();
    stopAddSpecialDecimalPoint2ndNumber();
    stopAddDecimalPoint();
    stop1stDigitSecondNumber();
    startStoringSecondNumber();
}

let inputOperator;
// 1st OPERATOR
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
        let resultSolutionBtn = operate();
        if (resultSolutionBtn === undefined) {
            start1stDigitSecondNumber();
            startAddSpecialDecimalPoint2ndNumber();
        } else {
            operatorsDisplay.textContent = "";
            topScreen.textContent = `${tempNumber} ${inputOperator} ${secondNumber} =`;
            topScreen.style.textAlign = 'right';
            tempNumber = firstNumber;
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
clearBtn.addEventListener('click', clearCalculator);

function clearCalculator() {
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
}

const deleteBtn = document.querySelector('.delete');
// "Del" or DELETE button
deleteBtn.addEventListener('click', () => {
    numbersDisplay.textContent = numbersDisplay.textContent.slice(0, -1);
    secondNumber = updateNumber();
    (numbersDisplay.textContent.includes(".")) ? stopAddDecimalPoint() : startAddDecimalPoint();
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