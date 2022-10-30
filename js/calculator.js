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

function operate(a, b, operator) {
    a = prompt('a please: ');
    let c = prompt('Choose an operator: ');
    b = prompt('b please: ');
    
    if (c === '+') {
        operator = add(a, b);
    } else if (c === '-') {
        operator = subtract(a, b);
    } else if (c === '*') {
        operator = multiply(a, b);
    } else if (c === '/') {
        operator = divide(a, b);
    }

    return operator;
}