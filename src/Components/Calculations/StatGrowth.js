import * as misc from "./Miscellaneous";

export function averageResultStat(base, growth_rate, levels) {
  const numericBase = parseInt(base, 10);
  const numericGrowthRate = parseInt(growth_rate, 10);
  const numericLevels = parseInt(levels, 10);
  const result = numericBase + (numericGrowthRate / 100) * numericLevels;
  const roundedResult = result.toFixed(1);
  return parseFloat(roundedResult); // Convert back to a floating-point number
}

export function attackDamage(userStat, weaponStat) {
  let atk = 0;
  if (weaponStat.StrMag) {
    atk = misc.fixToInt(userStat.finalStr);
  } else {
    atk = misc.fixToInt(userStat.finalMag);
  }
  const dmg = atk + parseInt(weaponStat.Might);
  return dmg;
}
export function attackHit(userStat, weaponStat) {
  const hit = misc.fixToInt(userStat.finalDex) + weaponStat.Hit;
  return hit;
}
export function attackCritical(userStat, weaponStat) {
  const crit =
    weaponStat.Critical +
    parseInt(
      (misc.fixToInt(userStat.finalDex) + misc.fixToInt(userStat.finalLck)) / 2
    );
    
  return crit;
}
export function attackSpeed(userStat, weaponStat) {
  let weight = weaponStat.Weight - parseInt(misc.fixToInt(userStat.finalStr));
  if (weight < 0) {
    weight = 0;
  }
  const as = misc.fixToInt(userStat.finalSpd) - weight;
  return as;
}

export function artAttack(userStat, weaponStat, artStat) {
  let atk = 0;
  if (weaponStat.StrMag && artStat.StrMag) {
    atk = misc.fixToInt(userStat.finalStr);
  } else {
    atk = misc.fixToInt(userStat.finalMag);
  }
  let artMt = artStat.Might;
  switch (artStat.ID) {
    case 13:
      artMt += misc.fixToInt(parseInt(misc.fixToInt(userStat.finalRes)) * 0.3);
      break;
    default:
      break;
  }
  const dmg = atk + parseInt(weaponStat.Might) + artMt;
  return dmg;
}
export function artHit(userStat, weaponStat, artStat) {
  let hit = misc.fixToInt(userStat.finalDex) + weaponStat.Hit;
  if (artStat.Hit) {
    hit += artStat.Hit;
  }
  return hit;
}
export function artCrit(userStat, weaponStat, artStat) {
  let crit =
    weaponStat.Critical +
    parseInt(
      (misc.fixToInt(userStat.finalDex) + misc.fixToInt(userStat.finalLck)) / 2
    );
  if (artStat.Critical) {
    crit += artStat.Critical;
  }
  return crit;
}
