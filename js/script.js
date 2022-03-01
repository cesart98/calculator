const calculator = (() => {
    const add = (a, b) => a + b;
    const sub = (a, b) => a - b;
    const mul = (a, b) => a * b;
    const div = (a, b) => a / b;
    return {
        add, sub, mul, div,
    };
})();

const argument = (() => {
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

const input = (() => {
    let input = [];
    const get = () => Number(input.join(''));
    const set = (value) => input.push(value);
    const clr = () => input.splice(0);
    const exists = () => input[0] ? true : false;
    const replace = (value) => argument[0] = value;
    return {
        get, set, clr, exists, replace
    };
})();

const display = (() => {
    let display = document.querySelector(".display");
    const err = () => display.textContent = 'Error';
    const set = (value) => display.textContent = value;
    const clr = () => display.textContent = '';
    return {
        err, set, clr
    };
})();

function handleEvent(e) {

    function getButtonClass () {
        return e.target.parentElement.className;
    }

    function setOperator () {
        return e.target.className;
    }

    function operate () {
        valueOne = argument.get();
        valueTwo = input.get();
        switch(operator) {
            case 'add':
                result = calculator.add(valueOne, valueTwo);
                display.set(result);
                argument.replace(result); // set result for next input
                break;
            case 'subtract':
                result = calculator.sub(valueOne, valueTwo);
                display.set(result);
                argument.replace(result); // set result for next input
                break;
            case 'multiply':
                result = calculator.mul(valueOne, valueTwo);
                display.set(result);
                argument.replace(result); // set result for next input
                break;
            case 'divide':
                result = calculator.div(valueOne, valueTwo);
                display.set(result);
                argument.replace(result); // set result for next input
                break;
            default:
                display.textContent = "Error";
        } 
    }

    let buttonClass = getButtonClass();
    
    switch(buttonClass) {
        case 'equals':
            if (input.exists() && argument.exists()) {
                operate();
                input.clr();
                operator = ''; // reset operator
            }
            break;
        case 'digits':
            buttonValue = e.target.innerHTML;
            input.set(buttonValue);
            display.set = input.get();
            break;
        case 'operators':
            if (input.exists() && argument.exists()) {
                operate();
                operator = setOperator();
                input.clr();
            } else if (input.exists() && !argument.exists()) {
                let newArgument = input.get();
                argument.set(newArgument);
                input.clr();
                operator = setOperator();
                display.clr = '';
            } else if (!input.exists() && argument.exists()) {
                operator = setOperator();
            }
            break;
        case 'clear':
            input.clr();
            argument.clr();
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


let operator;