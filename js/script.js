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

    if (buttonType == 'equals' && currentInput[0] && argumentArray[0]) {
        let argumentOne = argumentArray[0];
        let argumentTwo = Number(currentInput.join(''));
        if (mathOperator == 'add') {
            display.textContent = (add(argumentOne, argumentTwo));
        } else if (mathOperator == 'subtract') {
            display.textContent = (subtract(argumentOne, argumentTwo));
        } else if (mathOperator == 'multiply') {
            display.textContent = (multiply(argumentOne, argumentTwo));
        } else if (mathOperator == 'divide') {
            display.textContent = (divide(argumentOne, argumentTwo));
        }
    }

    if (buttonType == 'digits') {
        let buttonValue = e.target.innerHTML;
        currentInput.push(buttonValue);
        display.textContent += buttonValue;
    }

    if (buttonType == 'operators' && currentInput[0]) { // true if user has entered numbers
        let newArgument = Number(currentInput.join(''));
        argumentArray.push(newArgument);
        currentInput.splice(0); // resets input array
        mathOperator = e.target.className;
        display.textContent = '';
    }

    if (buttonType == 'clear') {
        currentInput.splice(0);
        argumentArray.splice(0);
        display.textContent = '';
    }
}

let buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener("click", handleEvent)
});

let display = document.querySelector(".display")


let currentInput = [];
let argumentArray = [];