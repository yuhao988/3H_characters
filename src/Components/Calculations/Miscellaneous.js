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

export function startClass(id) {
  switch (id) {
    case 2:
    case 3:
    case 5:
    case 6:
    case 7:
    case 9:
    case 10:
    case 12:
    case 15:
    case 16:
    case 17:
    case 18:
    case 19:
    case 20:
    case 22:
    case 24:
    case 37:
    case 38:
      return "Noble";
    case 1:
    case 4:
    case 8:
    case 11:
    case 13:
    case 14:
    case 21:
    case 23:
    case 25:
    case 36:
    case 39:
    case 40:
      return "Commoner";
    case 45:
    case 42:
      return "Priest";
    case 46:
      return "Fortress Knight";
    case 47:
      return "Warrior";
    case 48:
      return "Swordmaster";
    case 41:
      return "Wyvern Rider";
    case 43:
      return "Mage";
    case 44:
      return "Sniper";
    default:
      return "Dancer";
  }
}
