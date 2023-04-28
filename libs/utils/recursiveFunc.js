export const lottoNum = array => {
  if (!array) {
    var array = [];
  }
  let n = Math.floor(Math.random() * 8) + 1;

  if (array.length < 3) {
    if (array.indexOf(n) < 0) {
      array.push(n);
      return lottoNum(array);
    } else {
      return lottoNum(array);
    }
  } else {
    return array;
  }
};
