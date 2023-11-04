const calcDisplay = document.querySelector(".display-text");
const errorMsg = document.querySelector("#error-msg");
const OPERATOR_VALUE = {
    "^": 5,
    "*": 4,
    "/": 3,
    "+": 2,
    "-": 1
}


const updateDisplayText = (element) => {
    let input = element.id;
    console.log(input);

    if(!isNaN(input)) {
        calcDisplay.textContent += input;
    }
    else if(input === "clear") {
        calcDisplay.textContent = "";
    } 
    else if(input === "backspace") {
        let len = calcDisplay.textContent.length;
        calcDisplay.textContent = calcDisplay.textContent.substring(0, len-1);
    }
    else if(input === ".") {
        if(!calcDisplay.textContent.includes(".")) {
            calcDisplay.textContent += input;
        }
    }
    else if(input === "equal") {
        operate();
    }
    else if(input === "^") {
        let lastChar = calcDisplay.textContent.slice(-1).trim();
        if(!isNaN(lastChar) && lastChar !== "") {
            calcDisplay.textContent += input;
        } else {
            errorMsg.textContent = "An exponent can only be used after a number";
        }
    }
    else { // All other operators
        calcDisplay.textContent += ` ${input} `;
    }
    
}

const operate = () => {
    console.log("OPERATER OPERATER OP-OP-OP-OPERATER");
}

const addInputEventToButtons = () => {
    let buttons = document.querySelectorAll(".btn-body button");
    buttons.forEach(button => {
        button.setAttribute("onclick", "updateDisplayText(this)")
    })
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
addInputEventToButtons();