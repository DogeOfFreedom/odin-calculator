const displayTextElement = document.querySelector(".display-text");


const updateDisplayText = (element) => {
    let originalText = displayTextElement.textContent;
    let btnId = element.id;
    console.log(btnId);
}

const add = (n1, n2) => {
    return n1+ n2;
}

const subtract = (n1, n2) => {
    return n1 - n2;
}

const multiply = (n1, n2) => {
    return n1 * n2;
}

const divide = (n1, n2) => {
    return n1 / n2;
}

const operator = (op, n1, n2) => {
    switch (op) {
        case "+":
            return add(n1, n2);
        case "-":
            return subtract(n1, n2);
        case "*":
            return multiply(n1, n2);
        case "/":
            return divide(n1, n2);             
    }
}

let n1;
let n2;
let op;
