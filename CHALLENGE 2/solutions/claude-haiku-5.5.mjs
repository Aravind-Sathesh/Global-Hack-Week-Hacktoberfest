const SYMBOLS = [
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

const VALUES = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };

// Standard form only: the shortest numeral for each value.
const CANONICAL = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i;

export function toRoman(n) {
  if (typeof n !== "number" || !Number.isInteger(n) || n < 1 || n > 3999) {
    throw new Error(`toRoman: expected an integer from 1 to 3999, got ${String(n)}`);
  }
  let rest = n;
  let out = "";
  for (const [value, symbol] of SYMBOLS) {
    while (rest >= value) {
      out += symbol;
      rest -= value;
    }
  }
  return out;
}

export function fromRoman(s) {
  if (typeof s !== "string" || s.length === 0 || !CANONICAL.test(s)) {
    throw new Error(`fromRoman: not a standard Roman numeral: ${JSON.stringify(s)}`);
  }
  const upper = s.toUpperCase();
  let total = 0;
  for (let i = 0; i < upper.length; i++) {
    const value = VALUES[upper[i]];
    const next = VALUES[upper[i + 1]] ?? 0;
    total += value < next ? -value : value;
  }
  return total;
}
