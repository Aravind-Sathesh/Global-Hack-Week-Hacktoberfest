const T = [
  [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"],
  [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
];

export function toRoman(n) {
  if (typeof n !== "number" || !Number.isInteger(n) || n < 1 || n > 3999) {
    throw new Error("toRoman: expected an integer from 1 to 3999");
  }
  let out = "";
  for (const [v, s] of T) {
    while (n >= v) { out += s; n -= v; }
  }
  return out;
}

export function fromRoman(s) {
  if (typeof s !== "string" || !/^[IVXLCDMivxlcdm]+$/.test(s)) {
    throw new Error("fromRoman: expected a Roman numeral string");
  }
  const u = s.toUpperCase();
  let n = 0, i = 0;
  for (const [v, sym] of T) {
    while (u.startsWith(sym, i)) { n += v; i += sym.length; }
  }
  // Round-trip check rejects anything not in shortest form (IIII, VX, IC, MMMM...).
  if (i !== u.length || n > 3999 || toRoman(n) !== u) {
    throw new Error("fromRoman: not a standard Roman numeral");
  }
  return n;
}
