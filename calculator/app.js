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
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  updateDisplay() {
    if (this.operation != null) {
      this.displayField.innerText = `${this.operation}${this.currentOperand}`;
    } else {
      this.displayField.innerText = this.currentOperand;
    }
  }

  compute() {
    let result;
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

    this.currentOperand = result;
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
    //console.log(`Button ${button.innerText} pressed.`);
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