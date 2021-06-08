const numbers = document.querySelectorAll("[data-number]");
const dotBtn = document.querySelector("#dot");
const allClearBtn = document.querySelector("#ac");
const clearEntryBtn = document.querySelector("#ce");
const signChangeBtn = document.querySelector("#signchange");
const divisionBtn = document.querySelector("#division");
const multiplicationBtn = document.querySelector("#multiplication");
const subtractionBtn = document.querySelector("#subtraction");
const additionBtn = document.querySelector("#addition");
const operateBtn = document.querySelector("#equal");

const dotFunction = { none: 0, remove: 2, add: 1 };

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
  if (entry.length < 14) {
    displayScreen.style.fontSize = "28px";
    displayScreen.textContent = entry.length != 0 ? entry.join("") : number;
  } else {
    displayScreen.style.fontSize = "20px";
    displayScreen.textContent = number;
  }
  
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

function numberEnter(num) {
  if (isResultShown) {
    entry = secondEntry;
    isResultShown = false;
  }

  if (!typedAfterResult) typedAfterResult = true;
  entry.push(num);
  display();
}

function dotCheck() {
  if (entry.length == 0) {
    entry.push("0");
    return 2;
  } else if (entry.includes(".")) {
    return entry.indexOf(".") == entry.length - 1 ? 1 : 0;
  } else return 2;
}

function enterDot() {
  switch (dotCheck()) {
    case 0:
      break;

    case 1:
      clearEntry();
      break;

    case 2:
      numberEnter(".");
      break;
  }
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
  alert("Nein, tun Sie das nicht!");
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
dotBtn.addEventListener("click", enterDot);
allClearBtn.addEventListener("click", allClear);
clearEntryBtn.addEventListener("click", clearEntry);
signChangeBtn.addEventListener("click", changeSign);
divisionBtn.addEventListener("click", () => operatorOnPress(divide));
multiplicationBtn.addEventListener("click", () => operatorOnPress(multiply));
subtractionBtn.addEventListener("click", () => operatorOnPress(subtract));
additionBtn.addEventListener("click", () => operatorOnPress(add));
operateBtn.addEventListener("click", operate);

allClear();
