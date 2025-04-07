let expression;

function number(num) {
  var display = document.getElementById("display");
  display.value = display.value + num;
}

function operator(operator) {
  var display = document.getElementById("display");
  display.value = display.value + operator;
}

function clearLast() {
  var current = document.getElementById("display").value;
  var newText = current.substring(0, current.length - 1);
  document.getElementById("display").value = newText;
}

function clearAll() {
  document.getElementById("display").value = "";
}

function calculate() {
  document.getElementById("display").value = evaluate(
    document.getElementById("display").value
  );
}

function evaluate(exp) {
  let tokens = exp.match(/(\d+(\.\d+)?|[+\-*/])/g);
  if (!tokens) return false;

  let number = [];
  let operation = [];

  const operations = { "+": 1, "-": 2, "*": 3, "/": 4 };

  for (let token of tokens) {
    if (!isNaN(token)) {
      number.push(parseFloat(token));
    } else {
      while (
        operation.length &&
        operations[operation[operation.length - 1]] >= operations[token]
      ) {
        number = addOperationToEqa(number, operation);
      }
      operation.push(token);
    }
  }

  while (operation.length) {
    number = addOperationToEqa(number, operation);
  }
  return number[0];
}

function addOperationToEqa(number, operation) {
  let num1 = number.pop();
  let num2 = number.pop();
  let op = operation.pop();

  
  switch (op) {
    case "+":
      number.push(num2 + num1);
      break;
    case "-":
      number.push(num2 - num1);
      break;
    case "*":
      number.push(num2 * num1);
      break;
    case "/":
      number.push(num2 / num1);
      break;
  }
  return number;
}
