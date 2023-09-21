class Calculator {
  constructor(displayField) {
    this.displayField = displayField;
    this.currentOperand;
    this.previousOperand;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
    console.log(this.currentOperand);
  }

  selectOperator(operation) {
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;

    if (this.currentOperand !== '') {
      this.previousOperand = this.currentOperand;
    }
    this.currentOperand = '';
  }

  updateDisplay() {
    if (this.operation != null && this.currentOperand !== '') {
      this.displayField.innerText = `${this.operation}${this.currentOperand}`;
    } else if (this.currentOperand !== '') {
      this.displayField.innerText = this.currentOperand;
    }
  }

  compute() {
    let result;
    if (this.operation === '-' && this.previousOperand === '') this.previousOperand = '0';
    const current = parseFloat(this.currentOperand);
    const prev = parseFloat(this.previousOperand);
    if (isNaN(current) || isNaN(prev)) return;

    switch (this.operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '*':
        result = prev * current;
        break;
      case '/':
        result = prev / current;
        break;
      default:
        console.error("This case shouldn't occur...");
        return;
    }

    this.currentOperand = result.toFixed(3);
    this.operation = undefined;
    this.previousOperand = '';
  }
}

const display = document.querySelector(".calc__display");
const num_buttons = document.querySelectorAll(".calc__button-number");
const op_buttons = document.querySelectorAll(".calc__button-operation");
const eql_button = document.querySelector("#calc__eql");
const clr_button = document.querySelector("#calc__clr");

const calculator = new Calculator(display);

num_buttons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })
})

op_buttons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.selectOperator(button.innerText);
    calculator.updateDisplay();
  })
})

clr_button.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
})

eql_button.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
})

// Add event listeners for keyboard input
document.addEventListener('keydown', event => {
  if (event.key >= 0 && event.key <= 9) {
    calculator.appendNumber(event.key);
    calculator.updateDisplay();
  } else if (event.key === '.') {
    calculator.appendNumber(event.key);
    calculator.updateDisplay();
  } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
    calculator.selectOperator(event.key);
    calculator.updateDisplay();
  } else if (event.key === 'Enter') {
    calculator.compute();
    calculator.updateDisplay();
  } else if (event.key === 'Escape') {
    calculator.clear();
    calculator.updateDisplay();
  }
});