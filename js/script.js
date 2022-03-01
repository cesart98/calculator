const calculator = (() => {
    const add = (a, b) => a + b;
    const sub = (a, b) => a - b;
    const mul = (a, b) => a * b;
    const div = (a, b) => a / b;
    return {
        add, sub, mul, div,
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
                result = calculator.add(argumentOne, argumentTwo);
                display.textContent = result; // display results
                argumentArray[0] = result; // set result for next input
                break;
            case 'subtract':
                result = calculator.sub(argumentOne, argumentTwo);
                display.textContent = result; // display results
                argumentArray[0] = result; // set result for next input
                break;
            case 'multiply':
                result = calculator.mul(argumentOne, argumentTwo);
                display.textContent = result; // display results
                argumentArray[0] = result; // set result for next input
                break;
            case 'divide':
                result = calculator.div(argumentOne, argumentTwo);
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
    
    switch(buttonClass) {
        case 'equals':
            if (inputExists && argumentExists) {
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
            if (inputExists && argumentExists) {
                operate();
                operator = setOperator();
                clearInputArray();
            } else if (inputExists && !argumentExists) {
                let newArgument = getInputValue();
                argumentArray.push(newArgument);
                clearInputArray();
                operator = setOperator();
                display.textContent = '';
            } else if (!inputExists && argumentExists) {
                operator = setOperator();
            }
            break;
        case 'clear':
            clearInputArray();
            clearArgumentArray();
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
let argumentArray = [];