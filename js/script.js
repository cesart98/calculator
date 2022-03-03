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

const operator = (() => {
    let operator = [];
    const get = () => operator[0];
    const set = (value) => operator.push(value);
    const clr = () => operator.splice(0);
    const exists = () => operator[0] ? true : false;
    const replace = (value) => operator[0] = value;
    return {
        get, set, clr, exists, replace
    };
})();

const button = (() => {
    let button = document.querySelectorAll("button");
    button.forEach((button) => {
        button.addEventListener("click", handleEvent)
    });
    const type = (e) => e.target.parentElement.className;
    const value = (e) => e.target.innerHTML;;
    return {
        type, value
    }
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

function operate () {
    valueOne = argument.get();
    valueTwo = input.get();
    switch(operator.get()) {
        case 'add':
            result = calculator.add(valueOne, valueTwo);
            display.set(result);
            argument.replace(result);
            break;
        case 'subtract':
            result = calculator.sub(valueOne, valueTwo);
            display.set(result);
            argument.replace(result);
            break;
        case 'multiply':
            result = calculator.mul(valueOne, valueTwo);
            display.set(result);
            argument.replace(result);
            break;
        case 'divide':
            result = calculator.div(valueOne, valueTwo);
            display.set(result);
            argument.replace(result);
            break;
        default:
            display.err();
    } 
}

function handleEvent(event) {

    switch(button.type(event)) {
        case 'equals':
            if (input.exists() && argument.exists()) {
                operate();
                input.clr();
                operator.clr();
            }
            break;
        case 'digits':
            input.set(button.value(event));
            display.set(input.get());
            break;
        case 'operators':
            if (input.exists() && argument.exists()) {
                operate();
                operator.set(event.target.className);
                input.clr();
            } else if (input.exists() && !argument.exists()) {
                let newArgument = input.get();
                argument.set(newArgument);
                input.clr();
                operator.set(event.target.className);
                display.clr();
            } else if (!input.exists() && argument.exists()) {
                operator.set(event.target.className);
            }
            break;
        case 'clear':
            input.clr();
            argument.clr();
            display.clr();
            break;
        default:
            display.err();
    }  
}