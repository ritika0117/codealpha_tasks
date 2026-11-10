
// Get Display Elements
const previousOperand = document.getElementById("previousOperand");
const currentOperand = document.getElementById("currentOperand");

// Get Calculator Buttons
const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const actionButtons = document.querySelectorAll("[data-action]");

// Calculator Variables
let currentValue = "0";
let previousValue = "";
let operator = null;
let shouldResetScreen = false;

// Update Display
function updateDisplay() {
    currentOperand.textContent = currentValue;
    previousOperand.textContent = previousValue;
}

// Enter Number
function appendNumber(number) {
    if (shouldResetScreen) {
        currentValue = "0";
        shouldResetScreen = false;
    }

    if (number === "." && currentValue.includes(".")) return;

    if (currentValue === "0" && number !== ".") {
        currentValue = number;
    } else {
        currentValue += number;
    }

    updateDisplay();
}

// Choose Operator
function chooseOperator(selectedOperator) {
    if (operator !== null && !shouldResetScreen) {
        calculate();
    }

    previousValue = currentValue;
    operator = selectedOperator;
    shouldResetScreen = true;

    updateDisplay();
}

// Calculate Result
function calculate() {
    if (operator === null || previousValue === "") return;

    const firstNumber = parseFloat(previousValue);
    const secondNumber = parseFloat(currentValue);

    let result;

    switch (operator) {
        case "+":
            result = firstNumber + secondNumber;
            break;

        case "-":
            result = firstNumber - secondNumber;
            break;

        case "*":
            result = firstNumber * secondNumber;
            break;

        case "/":
            if (secondNumber === 0) {
                currentValue = "Error";
                previousValue = "";
                operator = null;
                shouldResetScreen = true;
                updateDisplay();
                return;
            }

            result = firstNumber / secondNumber;
            break;

        default:
            return;
    }

    currentValue = String(Number(result.toPrecision(12)));
    previousValue = "";
    operator = null;
    shouldResetScreen = true;

    updateDisplay();
}

// Clear Calculator
function clearCalculator() {
    currentValue = "0";
    previousValue = "";
    operator = null;
    shouldResetScreen = false;

    updateDisplay();
}

// Delete Last Digit
function deleteNumber() {
    if (shouldResetScreen || currentValue === "Error") {
        currentValue = "0";
        shouldResetScreen = false;
    } else {
        currentValue = currentValue.slice(0, -1);

        if (currentValue === "" || currentValue === "-") {
            currentValue = "0";
        }
    }

    updateDisplay();
}

// Calculate Percentage
function calculatePercentage() {
    if (currentValue === "Error") return;

    currentValue = String(Number(currentValue) / 100);
    updateDisplay();
}

// Number Button Events
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        appendNumber(button.dataset.number);
    });
});

// Operator Button Events
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        chooseOperator(button.dataset.operator);
    });
});

// Special Button Events
actionButtons.forEach(button => {
    button.addEventListener("click", () => {
        const action = button.dataset.action;

        switch (action) {
            case "clear":
                clearCalculator();
                break;

            case "delete":
                deleteNumber();
                break;

            case "decimal":
                appendNumber(".");
                break;

            case "percent":
                calculatePercentage();
                break;

            case "calculate":
                calculate();
                break;
        }
    });
});

// Keyboard Support
document.addEventListener("keydown", event => {
    if (event.key >= "0" && event.key <= "9") {
        appendNumber(event.key);
    }

    if (event.key === ".") {
        appendNumber(".");
    }

    if (["+", "-", "*", "/"].includes(event.key)) {
        chooseOperator(event.key);
    }

    if (event.key === "Enter" || event.key === "=") {
        event.preventDefault();
        calculate();
    }

    if (event.key === "Backspace") {
        deleteNumber();
    }

    if (event.key === "Escape") {
        clearCalculator();
    }

    if (event.key === "%") {
        calculatePercentage();
    }
});

// Initial Display
updateDisplay();
