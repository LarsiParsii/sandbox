const display = document.querySelector(".calc__display");
const num_buttons = document.querySelectorAll(".calc__button-number");
const dec_button = document.querySelector("#calc__dec");
const clr_button = document.querySelector("#calc__clr");
const add_button = document.querySelector("#calc__add");
const sub_button = document.querySelector("#calc__sub");
const mul_button = document.querySelector("#calc__mul");
const div_button = document.querySelector("#calc__div");
const eql_button = document.querySelector("#calc__eql");

const NONE = "";
const ADD = "+";
const SUB = "-";
const MUL = "*";
const DIV = "/";

let total = 0;
let displayed_num = "0";
display.innerHTML = displayed_num;
let dec_used = false;
let start_new_input = true;
let prev_number = 0;
let prev_operation = NONE;

num_buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const value = event.target.textContent;

    if (start_new_input == true) {
      displayed_num = value;
      start_new_input = false;
    } else {
      if (displayed_num !== "0") {
        displayed_num += value;
      }
    }
    display.innerHTML = displayed_num;
  });
});

add_button.addEventListener("click", (event) => {

});

sub_button.addEventListener("click", (event) => {

});

clr_button.addEventListener("click", (event) => {
  dec_used = false;
  start_new_input = true;
  prev_operation = NONE
  total = 0;
  displayed_num = "0";
  display.innerHTML = displayed_num;
});

eql_button.addEventListener("click", (event) => {
  run_last_operation();
});

dec_button.addEventListener("click", (event) => {
  if (!dec_used) {
    dec_used = true;
    displayed_num += ".";
    display.innerHTML = displayed_num;
  }
});

const run_last_operation = () => {
  switch (prev_operation) {
    case NONE:
      break;
    case ADD:
      total += prev_number;
      break;
    case SUB:
      total -= prev_number;
      break;
    default:
      console.error("This should never occur.");
      break;
  }

  if (prev_operation !== NONE) {
    displayed_num = total;
    display.innerHTML = displayed_num;
  }
  prev_operation = NONE;
  start_new_input = true;
};
