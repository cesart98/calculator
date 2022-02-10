function add(valueOne, valueTwo) {
    let sum = valueOne + valueTwo;
    return sum;
}

function subtract(valueOne, valueTwo) {
    let difference = valueOne - valueTwo;
    return difference;
}

function multiply(valueOne, valueTwo) {
    let product = valueOne * valueTwo;
    return product;
}

function divide(valueOne, valueTwo) {
    let quotient = valueOne / valueTwo;
    return quotient;
}

function handleEvent(e) {
    let buttonType = e.target.parentElement.className;

    if (buttonType == 'equals' && currentInput[0] && operation[0]) {
        let argumentOne = operation[0];
        let argumentTwo = Number(currentInput.join(''));
        if (mathOperator == 'add') {
            console.log(add(argumentOne, argumentTwo));
        } else if (mathOperator == 'subtract') {
            console.log(subtract(argumentOne, argumentTwo));
        } else if (mathOperator == 'multiply') {
            console.log(multiply(argumentOne, argumentTwo));
        } else if (mathOperator == 'divide') {
            console.log(divide(argumentOne, argumentTwo));
        }
    }

    if (buttonType == 'digits') {
        let buttonValue = e.target.innerHTML;
        currentInput.push(buttonValue);
    }

    if (buttonType == 'operators' && currentInput[0]) { // true if user has entered numbers
        let newArgument = Number(currentInput.join(''));
        operation.push(newArgument);
        currentInput.splice(0); // resets input array
        mathOperator = e.target.className;
    }

    if (buttonType == 'clear') {
        currentInput.splice(0);
        operation.splice(0);
    }
}

let buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener("click", handleEvent)
});

let display = document.querySelector(".display")


let currentInput = [];
let operation = [];