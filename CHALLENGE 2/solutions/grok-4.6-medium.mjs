const NUMERALS = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

const VALUES = Object.fromEntries(NUMERALS.map(([value, numeral]) => [numeral, value]));

export function toRoman(n) {
  if (!Number.isInteger(n) || n < 1 || n > 3999) {
    throw new Error("invalid number");
  }

  let remaining = n;
  let result = "";
  for (const [value, numeral] of NUMERALS) {
    while (remaining >= value) {
      result += numeral;
      remaining -= value;
    }
  }
  return result;
}

export function fromRoman(s) {
  if (typeof s !== "string" || s.length === 0) {
    throw new Error("invalid roman");
  }

  const upper = s.toUpperCase();
  let i = 0;
  let total = 0;

  while (i < upper.length) {
    const two = upper.slice(i, i + 2);
    const one = upper[i];
    if (two in VALUES) {
      total += VALUES[two];
      i += 2;
    } else if (one in VALUES) {
      total += VALUES[one];
      i += 1;
    } else {
      throw new Error("invalid roman");
    }
  }

  if (total < 1 || total > 3999 || toRoman(total) !== upper) {
    throw new Error("invalid roman");
  }

  return total;
}
