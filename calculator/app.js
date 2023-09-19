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
let new_input = false;
let prev_operation = NONE;

num_buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const value = event.target.textContent;

    if (new_input == false) {
      displayed_num = value;
      new_input = true;
    } else {
      displayed_num += value;
    }

    display.innerHTML = displayed_num;
  });
});

dec_button.addEventListener("click", (event) => {
  if (!dec_used) {
    dec_used = true;
    displayed_num += ".";
    display.innerHTML = displayed_num;
  }
});

clr_button.addEventListener("click", (event) => {
  dec_used = false;
  new_input = false;
  prev_operation = NONE;
  total = 0;
  displayed_num = "0";
  display.innerHTML = displayed_num;
});

eql_button.addEventListener("click", (event) => {
  console.log(`Before =: ${total}.`);
  switch (prev_operation) {
    case ADD:
      total += parseFloat(displayed_num);
      break;
    case SUB:
      total -= parseFloat(displayed_num);
      break;
    case MUL:
      break;
    case DIV:
      break;
  }

  displayed_num = total;
  new_input = false;

  display.innerHTML = displayed_num;
  console.log(`After  =: ${total}.`);
});

add_button.addEventListener("click", (event) => {
  console.log(`Before +: ${total}.`);
  if (new_input) {
    total += parseFloat(displayed_num);
    displayed_num = total;
    prev_operation = ADD;
    new_input = false;
    display.innerHTML = displayed_num;
  }
  console.log(`After  +: ${total}.`);
});

sub_button.addEventListener("click", (event) => {
  console.log(`Before -: ${total}.`);

  total += parseFloat(displayed_num);

  if (new_input) {
    total -= parseFloat(displayed_num);
    displayed_num = total;
    prev_operation = SUB;
    new_input = false;
    display.innerHTML = displayed_num;
  }
  console.log(`After  -: ${total}.`);
});
