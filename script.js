const numbers = document.querySelectorAll("[data-number]");
const allClearBtn = document.querySelector("#ac");
const clearEntryBtn = document.querySelector("#ce");
const signChangeBtn = document.querySelector("#signchange");
const divisionBtn = document.querySelector("#division");
const multiplicationBtn = document.querySelector("#multiplication");
const subtractionBtn = document.querySelector("#subtraction");
const additionBtn = document.querySelector("#addition");
const operateBtn = document.querySelector("#equal");

let displayScreen = document.querySelector("#display");

let firstEntry = [];
let secondEntry = [];
let entry = []; //current array

let isFirstEntry = true;
let isResultShown = false;
let typedAfterResult = true;

let number; //displayed number
let firstNum;
let secondNum;

let operator; //operator expression

function display() {
  number = convertNumber(entry);
  if (isNaN(number) && entry.includes("-")) {
    number = 0;
    changeSign();
  }
  displayScreen.textContent = number;
}

function allClear() {
  firstEntry = [];
  secondEntry = [];
  entry = firstEntry;
  isFirstEntry = true;
  isResultShown = false;
  number = 0;
  firstNum;
  secondNum;
  operator;
  display();
}

function clearEntry() {
  entry.pop();
  display();
}

function changeSign() {
  entry[0] == "-" ? entry.shift() : entry.unshift("-");
  display();
}

function dotCheck(){
    entry.includes('.') ? false : true;
}

function numberEnter(num) {
  if (isResultShown) {
    entry = secondEntry;
    isResultShown = false;
  }

//TODO include dot check and dot removal functionality

  if (!typedAfterResult) typedAfterResult = true;
  entry.push(num);
  display();
}

function operatorOnPress(operation) {
  if (firstEntry.length == 0) firstEntry = [0];
  operator = operation;
  entry = secondEntry;
  if (!firstEntry.length == 0 && !secondEntry.length == 0) operate();
}

function divide(a, b) {
  if (b != 0) {
    return a / b;
  }
  alert("No, you are not doing that!");
  return 0;
}

function multiply(a, b) {
  return a * b;
}

function subtract(a, b) {
  return a - b;
}

function add(a, b) {
  return a + b;
}

function decimalRound(num) {
  return num != Math.floor(num) ? Math.round(num * 1000) / 1000 : num;
}

function convertNumber(array) {
  return Number(array.join(""));
}

function operate() {
  if (typedAfterResult) {
    firstNum = convertNumber(firstEntry);
    secondNum = convertNumber(secondEntry);
    result = operator(firstNum, secondNum);
    number = decimalRound(result);
    firstEntry = number.toString().split("");
    secondEntry = [];
    entry = firstEntry;
    isFirstEntry = false;
    isResultShown = true;
    typedAfterResult = false;
    display();
  }
}

numbers.forEach(function (number) {
  number.addEventListener("click", () => {
    numberEnter(number.getAttribute("data-number"));
  });
});
allClearBtn.addEventListener("click", allClear);
clearEntryBtn.addEventListener("click", clearEntry);
signChangeBtn.addEventListener("click", changeSign);
divisionBtn.addEventListener("click", () => operatorOnPress(divide));
multiplicationBtn.addEventListener("click", () => operatorOnPress(multiply));
subtractionBtn.addEventListener("click", () => operatorOnPress(subtract));
additionBtn.addEventListener("click", () => operatorOnPress(add));
operateBtn.addEventListener("click", operate);

allClear();
