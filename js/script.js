const calculator = (() => {
    const add = (a, b) => a + b;
    const sub = (a, b) => a - b;
    const mul = (a, b) => a * b;
    const div = (a, b) => a / b;
    return {
        add, sub, mul, div,
    };
})();

const valueOne = (() => {
    let argument = [];
    const get = () => argument[0];
    const set = (value) => argument.push(value);
    const clr = () => argument.splice(0);
    const exists = () => argument[0] ? true : false;
    const replace = (value) => argument[0] = value;
    return {
        get, set, clr, exists, replace
    };
})();

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

    function getInputValue () {
        return Number(inputArray.join(''));
    }

    function setOperator () {
        return e.target.className;
    }
    
    function clearInputArray () {
        return inputArray.splice(0);
    }

    function operate () {
        argumentOne = valueOne.get();
        argumentTwo = getInputValue();
        switch(operator) {
            case 'add':
                result = calculator.add(argumentOne, argumentTwo);
                display.textContent = result; // display results
                valueOne.replace(result); // set result for next input
                break;
            case 'subtract':
                result = calculator.sub(argumentOne, argumentTwo);
                display.textContent = result; // display results
                valueOne.replace(result); // set result for next input
                break;
            case 'multiply':
                result = calculator.mul(argumentOne, argumentTwo);
                display.textContent = result; // display results
                valueOne.replace(result); // set result for next input
                break;
            case 'divide':
                result = calculator.div(argumentOne, argumentTwo);
                display.textContent = result; // display results
                valueOne.replace(result); // set result for next input
                break;
            default:
                display.textContent = "Error";
        } 
    }

    let buttonClass = getButtonClass();
    let inputExists = checkForInput();
    
    switch(buttonClass) {
        case 'equals':
            if (inputExists && valueOne.exists()) {
                operate();
                clearInputArray();
                operator = ''; // reset operator
            }
            break;
        case 'digits':
            buttonValue = e.target.innerHTML;
            inputArray.push(buttonValue);
            display.textContent = inputArray.join('');
            break;
        case 'operators':
            if (inputExists && valueOne.exists()) {
                operate();
                operator = setOperator();
                clearInputArray();
            } else if (inputExists && !valueOne.exists()) {
                let newArgument = getInputValue();
                valueOne.set(newArgument);
                clearInputArray();
                operator = setOperator();
                display.textContent = '';
            } else if (!inputExists && valueOne.exists()) {
                operator = setOperator();
            }
            break;
        case 'clear':
            clearInputArray();
            valueOne.clr();
            display.textContent = '';
            break;
        default:
            display.textContent = "Error";
    }  
}

let buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener("click", handleEvent)
});

let display = document.querySelector(".display")

let operator;
let inputArray = [];