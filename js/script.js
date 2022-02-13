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

    function getButtonClass () {
        return e.target.parentElement.className;
    }

    function checkForInput () {
        if (inputArray[0]) {
            return true;
        } else {
            return false;
        }
    }

    function checkForArgument () {
        if (argumentArray[0]) {
            return true;
        } else {
            return false;
        }
    }

    function getArgumentOne () {
        return argumentArray[0];
    }

    function getInputValue () {
        return Number(inputArray.join(''));
    }

    function setOperator () {
        return e.target.className;
    }

    function clearArgumentArray () {
        return argumentArray.splice(0);
    }
    
    function clearInputArray () {
        return inputArray.splice(0);
    }

    function operate () {
        argumentOne = getArgumentOne();
        argumentTwo = getInputValue();
        switch(operator) {
            case 'add':
                result = add(argumentOne, argumentTwo);
                display.textContent = result; // display results
                argumentArray[0] = result; // set result for next input
                break;
            case 'subtract':
                result = subtract(argumentOne, argumentTwo);
                display.textContent = result; // display results
                argumentArray[0] = result; // set result for next input
                break;
            case 'multiply':
                result = multiply(argumentOne, argumentTwo);
                display.textContent = result; // display results
                argumentArray[0] = result; // set result for next input
                break;
            case 'divide':
                result = divide(argumentOne, argumentTwo);
                display.textContent = result; // display results
                argumentArray[0] = result; // set result for next input
                break;
            default:
                display.textContent = "Error";
        } 
    }

    let buttonClass = getButtonClass();
    let inputExists = checkForInput();
    let argumentExists = checkForArgument();
    
    if (buttonClass == 'equals' && inputExists && argumentExists) {
        operate();
        clearInputArray();
        operator = ''; // reset operator
    }

    if (buttonClass == 'digits') {
        buttonValue = e.target.innerHTML;
        inputArray.push(buttonValue);
        display.textContent = inputArray.join('');
    }

    if (buttonClass == 'operators' && inputExists && argumentExists) {
        operate();
        operator = setOperator();
        clearInputArray();
    } else if (buttonClass == 'operators' && inputExists && !argumentExists) {
        let newArgument = getInputValue();
        argumentArray.push(newArgument);
        clearInputArray();
        operator = setOperator();
        display.textContent = '';
    } else if (buttonClass == 'operators' && !inputExists && argumentExists) {
        operator = setOperator();
    }

    if (buttonClass == 'clear') {
        clearInputArray();
        clearArgumentArray();
        display.textContent = '';
    }

    
}

let buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener("click", handleEvent)
});

let display = document.querySelector(".display")

let operator;
let inputArray = [];
let argumentArray = [];