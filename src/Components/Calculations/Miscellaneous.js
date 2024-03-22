export function displayRange(range_min, range_max) {
  if (range_min === range_max || range_max === null) {
    return range_min;
  } else if (range_max === 0) {
    return "in description";
  } else {
    return range_min + "-" + range_max;
  }
}

export function fixToInt(num) {
  num = parseInt(num.toFixed(0));
  return num;
}
