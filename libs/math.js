'use strict';

module.exports = {
  produceExpression : function(){    
    var x = Math.floor(100 * Math.random());
    var y = Math.floor(100 * Math.random());
    var op = ["+", "-", "/", "*"];
    var expression = ""+x+" "+op[Math.floor(Math.random() * 4)]+" "+y+",";
    return expression;
  },
  resolve: function (input) {

    var answer
      , nums = input.split(" ")
      , first = parseInt(nums[0])
      , op = nums[1]
      , second = parseInt(nums[2]);

      switch(op){
        case "+":
        answer = first + second;
        break;
        case "-":
        answer = first - second;
        break;
        case "*":
        answer = first * second;
        break;
        case "/":
        answer = first / second;
        break;
      }

      return answer.toFixed(2).replace(/\.00$/, '');
  }
}