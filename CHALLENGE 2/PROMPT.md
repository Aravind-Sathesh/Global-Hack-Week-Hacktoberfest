Create `solutions/answer.mjs`, a JavaScript ES module with no dependencies that exports two functions:

- `toRoman(n)`: converts an integer from 1 to 3999 to a Roman numeral string, e.g. `toRoman(1994)` returns `"MCMXCIV"`.
- `fromRoman(s)`: converts a Roman numeral string back to an integer, e.g. `fromRoman("MCMXCIV")` returns `1994`. Accept upper or lower case.

Both functions must throw an `Error` for invalid input:

- `toRoman`: anything that isn't an integer from 1 to 3999 (0, negatives, decimals, NaN, strings, 4000 and up).
- `fromRoman`: anything that isn't a string in standard form. Standard form means the shortest numeral for that number, so `"IIII"`, `"VX"`, `"IC"`, `"IIV"` and `"MMMM"` are invalid, and so are the empty string, spaces and any other letters.

Only create that one file. Don't open or read any other file in this folder.
