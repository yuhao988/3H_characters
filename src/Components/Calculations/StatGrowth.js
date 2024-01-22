export function averageResultStat(base, growth_rate, levels) {
  const numericBase = parseInt(base, 10);
  const numericGrowthRate = parseInt(growth_rate, 10);
  const numericLevels = parseInt(levels, 10);
  const result = numericBase + (numericGrowthRate / 100) * numericLevels;
  const roundedResult = result.toFixed(1);
  return parseFloat(roundedResult); // Convert back to a floating-point number
}
