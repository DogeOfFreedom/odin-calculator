const calcDisplay = document.querySelector(".display-text");
const errorMsg = document.querySelector("#error-msg");
const OPERATORS = ["^", "*", "/", "+", "-"];
let clearPreviousResult = false;

const updateDisplayText = (element) => {
    let input = element.id;

    if(clearPreviousResult) {
        calcDisplay.textContent = "";
        clearPreviousResult = false;
    }

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
        evaluate();
        clearPreviousResult = true;
    }
    else if(input === "^") {
        let lastChar = calcDisplay.textContent.slice(-1).trim();
        if(!isNaN(lastChar) && lastChar !== "") {
            calcDisplay.textContent += input;
        } else {
            errorMsg.textContent = 
                "An exponent can only be used after a number";
        }
    }
    else { // All other operators
        calcDisplay.textContent += ` ${input} `;
    }
}

const evaluate = () => {
    console.log("I'm operator mah");
    let expressionInputs = 
        calcDisplay.textContent.replace('^', ' ^ ').split(" ");
    
        console.table(expressionInputs);

    if(!isValidexpression(expressionInputs)) {
        errorMsg.textContent = "Invalid expression!";
        return; 
    }

    calcDisplay.textContent = evaluateExpression(expressionInputs); 
}

const evaluateExpression = (expressionInputs) => {
    let result = expressionInputs;
    OPERATORS.forEach(operator => {
        result = evaluateExpressionForOperator(operator, result);
    })
    return result.toString();
}

const evaluateExpressionForOperator = (op, expressionInputs) => {
    if(expressionInputs.length <= 1) {
        return expressionInputs;
    }
    let operatorExists = false; 
    let left = [];
    let evaluate = [];
    let right = [];

    for(let i = 0; i < expressionInputs.length; i++) {
        if(expressionInputs[i] === op) {
            let startSliceIndex = i-1; // Start is inclusive
            let endSliceIndex = i+2; // End in exclusive
            evaluate = expressionInputs.slice(startSliceIndex, endSliceIndex);
            left = expressionInputs.slice(0, startSliceIndex);
            right = expressionInputs.slice(endSliceIndex);
            operatorExists = true;
            break;
        }
    }

    if(operatorExists) {
        let n1 = Number(evaluate[0]);
        let n2 = Number(evaluate[2]);
        evaluate = [operator(op, n1, n2)];  

        right = evaluateExpressionForOperator(op, right);

        return left.concat(evaluate).concat(right);
    } else {
        return expressionInputs;
    }    
}

const isValidexpression = (expression) => {
    for(let i = 0; i < expression.length; i++) {
        if(OPERATORS.includes(expression[i])) {
            if(isNaN(expression[i-1]) && isNaN(expression[i+1])) {
                return false;
            }
        }
    }
    return true;
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

const pow = (n1, n2) => {
    return Math.pow(n1, n2);
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
        case "^":
            return pow(n1, n2);
    }
}

addInputEventToButtons();