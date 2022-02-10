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
    function assignInputOne() {
        inputOne = Number(arrayOne.join(''));
    }

    let btnValue = e.target.innerHTML;
    if (!isNaN(btnValue)) {
        arrayOne.push(btnValue);
    } else if (isNaN(btnValue)) {
        assignInputOne();
    }
}

let buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener("click", handleEvent)
});

let display = document.querySelector(".display")

let arrayOne = [];
let arrayTwo = [];