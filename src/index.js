module.exports = function check(str, bracketsConfig) {
  const backStackOpenBracket = [];
  const backStackCloseBracket = [];
  const brackets = Array.from(str);
  let isCorrect = null;
  for(let i = 0; i < brackets.length; i++) {
    let bracket = brackets[i];
    if(checkBracketType(bracket, bracketsConfig) === OPEN_BRACKET) {
      backStackOpenBracket.push(bracket);
    }
    if(checkBracketType(bracket, bracketsConfig) === CLOSE_BRACKET) {
      backStackCloseBracket.unshift(bracket);
    }
    if(backStackOpenBracket.length < backStackCloseBracket.length) {
      isCorrect = false;
      break;
    }
    if(backStackOpenBracket.length === backStackCloseBracket.length) {
      for(let i = 0; i < backStackCloseBracket.length; i++) {
        const pair = [];
        pair.push(backStackOpenBracket[i]);
        pair.push(backStackCloseBracket[i]);
        if(!isPairBrackes(pair, bracketsConfig)) {
          isCorrect = false
          break;
        }
      }
      backStackOpenBracket.length = 0;
      backStackCloseBracket.length = 0;
    }
  }
  if(backStackOpenBracket.length > 0 || backStackCloseBracket.length > 0) {
    isCorrect = false;
  }
  if(isCorrect === null) {
    isCorrect = true;
  }
  return isCorrect;
}

const OPEN_BRACKET = 'OPEN_BRACKET';
const CLOSE_BRACKET = 'CLOSE_BRACKET';
const UNIVERSAL_BRACKET = 'UNIVERSAL_BRACKET';

function checkBracketType(bracket, config) {
  let type;
  config.forEach(pair => {
    if(pair[0] === bracket) {
      type = OPEN_BRACKET;
    }
    if(pair[1] === bracket) {
      type = CLOSE_BRACKET;
    }
    if(pair[0] === bracket && pair[1] === bracket) {
      type = UNIVERSAL_BRACKET;
    }
  });
  return type;
}

function isPairBrackes(brackets, config) {
  let isPair = false;
  config.forEach(pair => {
    if(pair[0] === brackets[0] && pair[1] === brackets[1]) {
      isPair = true;
    }
  });
  return isPair;
}
