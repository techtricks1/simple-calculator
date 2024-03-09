const display = document.getElementById('display');
let firstOperand = null;
let secondOperand = null;
let operator = null;
let memoryValue = null; 

function appendNumber(number) {
  if (operator === null) {
    firstOperand = firstOperand !== null ? parseFloat(`${firstOperand}${number}`) : number;
    display.value = firstOperand;
  } else {
    secondOperand = secondOperand !== null ? parseFloat(`${secondOperand}${number}`) : number;
    display.value = `${firstOperand} ${operator} ${secondOperand}`;
  }
}

function appendOperator(op) {
  if (firstOperand !== null && secondOperand !== null) {
    calculate();
  }
  if (operator === null) {
    display.value += op;
    operator = op;
  } else {
    if (secondOperand === null) { // If second operand hasn't been entered yet
      operator = op;
      display.value = `${firstOperand} ${operator}`;
    } else {
      calculate();
      operator = op;
      display.value = `${firstOperand} ${operator}`;
    }
  }
}

function calculate() {
  if (firstOperand !== null && secondOperand !== null && operator !== null) {
    const first = parseFloat(firstOperand);
    const second = parseFloat(secondOperand);
    let result;
    switch (operator) {
      case '+':
        result = first + second;
        break;
      case '-':
        result = first - second;
        break;
      case '*':
        result = first * second;
        break;
      case '/':
        if (second === 0) {
          display.value = "Error: Division by zero";
          return;
        }
        result = first / second;
        break;
      default:
        return;
    }

    display.value = result;
    firstOperand = result;
    secondOperand = null;
    operator = null;
  }
}

function clearDisplay() {
  firstOperand = null;
  secondOperand = null;
  operator = null;
  memoryValue = null; 
  display.value = '';
}

function addToMemory() {
  memoryValue = display.value;
}

function recallFromMemory() {
  if (memoryValue !== null) {
    display.value = memoryValue;
  }
}

// Keyboard support
document.addEventListener('keydown', (event) => {
  const key = event.key;
  if (/\d/.test(key)) {
    appendNumber(parseInt(key));
  } else if (['+', '-', '*', '/'].includes(key)) {
    appendOperator(key);
  } else if (key === '=' || key === 'Enter') {
    calculate();
  } else if (key === 'Escape' || key === 'Delete') {
    clearDisplay();
  } else if (key === 'M+') {
    addToMemory();
  } else if (key === 'MR') {
    recallFromMemory();
  }
});

// Optional styling adjustments (replace with your desired styles)
const buttons = document.querySelectorAll('.buttons button');
buttons.forEach(button => {
  button.style.fontSize = '24px';
  button.style.padding = '14px';
  button.style.margin = '10px';
});
