module.exports = function check(str, bracketsConfig) {
  const backStackOpenBracket = [];
  const backStackCloseBracket = [];
  const brackets = Array.from(str);
  let isCorrect = null;
  for(let i = 0; i < brackets.length; i++) {
    let bracket = brackets[i];
    if(isOpenBracket(bracket, bracketsConfig)) {
      backStackOpenBracket.push(bracket);
    }
    if(!isOpenBracket(bracket, bracketsConfig)) {
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

function isOpenBracket(bracket, config) {
  let isOpen = null;
  config.forEach(pair => {
    if(pair[0] === bracket) {
      isOpen = true;
    }
    if(pair[1] === bracket) {
      isOpen = false;
    }
  });
  return isOpen;
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
