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
  let weight = weaponStat.Weight - parseInt(misc.fixToInt(userStat.finalStr/5));
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
    case 12:
    case 30:
      artMt += misc.fixToInt(parseInt(misc.fixToInt(userStat.finalDex)) * 0.3);
      break;
    case 13:
    case 44:
      artMt += misc.fixToInt(parseInt(misc.fixToInt(userStat.finalRes)) * 0.3);
      break;
    case 16:
    case 17:
      artMt += misc.fixToInt(parseInt(misc.fixToInt(userStat.finalMag)) * 0.3);
      break;
    case 20:
      artMt += misc.fixToInt(parseInt(misc.fixToInt(userStat.finalCha)) * 0.3);
      break;
    case 26:
    case 33:
      artMt += misc.fixToInt(parseInt(misc.fixToInt(userStat.finalSpd)) * 0.3);
      break;
    case 27:
      const minV = atk + parseInt(weaponStat.Might) + artMt;
      const maxV =
        atk +
        parseInt(weaponStat.Might) +
        artMt +
        misc.fixToInt(userStat.finalHP) -
        1;
      return minV + "-" + maxV;
    case 28:
    case 41:
      artMt += misc.fixToInt(parseInt(misc.fixToInt(userStat.finalDef)) * 0.3);
      break;
    case 40:
      const minE = atk + parseInt(weaponStat.Might) + artMt;
      const maxE =
        atk +
        parseInt(weaponStat.Might) +
        artMt +
        misc.fixToInt(misc.fixToInt(weaponStat.Durability) * 0.3);
      return minE + "-" + maxE;
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

export function spellDamage(userStat, spellStat) {
  const dmg = misc.fixToInt(userStat.finalMag) + parseInt(spellStat.Might);
  return dmg;
}
export function spellHit(userStat, spellStat) {
  const hit = misc.fixToInt(userStat.finalDex) + spellStat.Hit;
  return hit;
}
export function spellCritical(userStat, spellStat) {
  const crit =
    spellStat.Critical +
    parseInt(
      (misc.fixToInt(userStat.finalDex) + misc.fixToInt(userStat.finalLck)) / 2
    );

  return crit;
}
export function spellAS(userStat, spellStat) {
  let weight =
    spellStat.Weight - parseInt(misc.fixToInt(userStat.finalStr/5) );
  if (weight < 0) {
    weight = 0;
  }
  const as = misc.fixToInt(userStat.finalSpd) - weight;
  return as;
}
