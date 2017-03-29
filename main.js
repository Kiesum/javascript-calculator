$(function() {

  var currentValue = '';
  var equation = '';
  var isResult = false;
  var needsOperator; 

  var screen = $('.screen');

  function inputNumbers(number) {
    currentValue += number;
    displayNumber(currentValue);
  }

  function displayNumber(currentValue) {
    screen.html(currentValue)
  }

  function displayOperator(operator) {
    screen.html(operator);
  }

  function add() {
    equation += currentValue + ' + ' ;
    currentValue = '';
    displayOperator('+');
  }

  function subtract() {
    equation += currentValue + ' - ' ;
    currentValue = '';
    displayOperator('-');
  }

  function multiply() {
    equation += currentValue + ' * ' ;
    currentValue = '';
    displayOperator('x');
  }

  function divide() {
    equation += currentValue + ' / ' ;
    currentValue = '';
    displayOperator('/');
  }

  function equals() {
    equation += currentValue;
    var result = eval(equation);
    currentValue = '';
    equation = result;
    isResult = true;
    displayResult(result);
  }

  function clear() {
    currentValue = '0';
    equation = '';
    clearScreen();
  }

  function clearScreen() {
    screen.html(currentValue);
  }

  function displayResult(result) {
    screen.html(result);
  }
  
  $('.number').on('click', function() {
    needsOperator = true;
    if (isResult) {
      equation = '';
      inputNumbers($(this).attr('value'));
    } else {
      inputNumbers($(this).attr('value'));
    }
  });

  $('.operators input').on('click', function() {
    isResult = false;
    if (needsOperator) {
      switch ($(this).attr('value')) {
        case '+':
          add();
          needsOperator = false;
          break;
        case '-':
          subtract();
          needsOperator = false;
          break;
        case 'x':
          multiply();
          needsOperator = false;
          break;
        case '/':
          divide();
          needsOperator = false;
          break;
        case '=':
          equals();
          break;
        default: 
          console.log('can not find');
      }
    };
  })

  $('.clear').on('click', function() {
    clear();
  });

});