$(function() {

  var clearedValue = '0';
  var currentValue = '';
  var equation = '';
  var isResult = false;
  var needsOperator; 

  var screen = $('.screen');
  var equationScreen = $('.equation');

  function inputNumbers(number) {
    currentValue += number;
    equation += number;
    shrinkNumberSize(currentValue);
    displayNumber(currentValue);
  }

  function shrinkNumberSize(number) {
    if (number.length < 8) {
      screen.css({'font-size': '65px'});
    } else if (number.length >= 8 && number.length < 10) {
      screen.css({'font-size': '55px'});
    } else if (number.length >= 10 && number.length < 12) {
      screen.css({'font-size': '45px'});
    } else if (number.length >= 12 && number.length < 14) {
      screen.css({'font-size': '35px'});
    } else if (number.length >= 14 && number.length < 16) {
      screen.css({'font-size': '25px'});
    } else if (number.length >= 16){
      screen.css({'font-size': '18px'});
    }
  }

  function displayNumber(currentValue) {
    screen.html(currentValue)
    equationScreen.html(equation);
  }

  function add() {
    equation += ' + ';
    currentValue = '';
    displayNumber();
  }

  function subtract() {
    equation += ' - ';
    currentValue = '';
    displayNumber();
  }

  function multiply() {
    equation += ' * ';
    currentValue = '';
    displayNumber();
  }

  function divide() {
    equation += ' / ';
    currentValue = '';
    displayNumber();
  }

  function equals() {
    var result = eval(equation);
    currentValue = '';
    equation = result;
    isResult = true;
    displayResult(result);
  }

  function addDecimal() {
    isResult = false;
    currentValue += '.';
    equation += '.';
    displayNumber(currentValue);
  }

  function clear() {
    currentValue = '';
    equation = '';
    clearScreen();
    shrinkNumberSize(currentValue);
  }

  function hasDecimal() {
    return currentValue.includes('.');
  }

  function clearScreen() {
    screen.html(clearedValue);
    equationScreen.html(clearedValue)
  }

  function displayResult(result) {
    shrinkNumberSize(result.toString());
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

  $('.operator').on('click', function() {
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
  });

  $('.decimal').on('click', function() {
    if (!hasDecimal() && isResult) {
      equation = '';
      addDecimal();
    } else if (!hasDecimal()){
      addDecimal();
    }
  });

  $('.clear').on('click', function() {
    clear();
  });

});