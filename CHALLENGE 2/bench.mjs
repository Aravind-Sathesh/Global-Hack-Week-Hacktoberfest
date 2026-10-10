// Grades every solutions/*.mjs against the same cases: node bench.mjs
import { readdir, readFile } from "node:fs/promises";
import { Worker, isMainThread, parentPort, workerData } from "node:worker_threads";

const valid = [
  [1, "I"], [4, "IV"], [9, "IX"], [14, "XIV"], [40, "XL"], [90, "XC"], [400, "CD"],
  [900, "CM"], [1994, "MCMXCIV"], [2026, "MMXXVI"], [3888, "MMMDCCCLXXXVIII"], [3999, "MMMCMXCIX"],
];
const badNumbers = [0, -1, 4000, 1.5, NaN, Infinity, "5", null];
const badNumerals = ["", "IIII", "VV", "VX", "IC", "IIV", "XM", "LL", "DD", "IL", "MMMM", "ABC", " X", "X ", "IXI", 5];

function throws(fn) {
  try {
    fn();
    return false;
  } catch (e) {
    return e instanceof Error;
  }
}

const show = (x) => (typeof x === "string" ? JSON.stringify(x) : String(x));

function cases({ toRoman, fromRoman }) {
  return [
    ...valid.map(([n, s]) => [`toRoman(${n}) = ${s}`, () => toRoman(n) === s]),
    ...valid.map(([n, s]) => [`fromRoman("${s}") = ${n}`, () => fromRoman(s) === n]),
    ["fromRoman accepts lower case", () => fromRoman("mcmxciv") === 1994],
    ...badNumbers.map((n) => [`toRoman(${show(n)}) throws`, () => throws(() => toRoman(n))]),
    ...badNumerals.map((s) => [`fromRoman(${show(s)}) throws`, () => throws(() => fromRoman(s))]),
    ["round trip 1..3999", () => {
      for (let n = 1; n <= 3999; n++) if (fromRoman(toRoman(n)) !== n) return false;
      return true;
    }],
  ];
}

// Each case runs in its own worker so an infinite loop or a memory blow-up fails that case, not the run.
if (!isMainThread) {
  const mod = await import(workerData.url);
  let ok = false;
  try {
    ok = cases(mod)[workerData.i][1]();
  } catch {
    // A crash where a value was expected counts as a fail.
  }
  parentPort.postMessage(ok === true);
} else {
  await main();
}

function run(url, i) {
  return new Promise((resolve) => {
    const worker = new Worker(new URL(import.meta.url), { workerData: { url: url.href, i }, resourceLimits: { maxOldGenerationSizeMb: 256 } });
    const timer = setTimeout(() => worker.terminate().then(() => resolve(false)), 2000);
    worker.once("message", (ok) => {
      clearTimeout(timer);
      worker.terminate().then(() => resolve(ok));
    });
    worker.once("error", () => {
      clearTimeout(timer);
      resolve(false);
    });
  });
}

async function main() {
  const files = (await readdir(new URL("./solutions/", import.meta.url))).filter((f) => f.endsWith(".mjs")).sort();
  if (files.length === 0) return console.log("No solutions yet. Save each model's answer as solutions/<model>.mjs.");

  const names = cases({}).map(([name]) => name);
  const rows = [];
  const failures = [];
  for (const file of files) {
    const url = new URL(`./solutions/${file}`, import.meta.url);
    const model = file.replace(/\.mjs$/, "");
    const lines = (await readFile(url, "utf8")).split("\n").filter((l) => l.trim()).length;
    try {
      await import(url);
    } catch (e) {
      rows.push({ model, passed: "load error", lines });
      failures.push(`${model}: ${e.message}`);
      continue;
    }
    const results = await Promise.all(names.map((_, i) => run(url, i)));
    const failed = names.filter((_, i) => !results[i]);
    rows.push({ model, passed: `${names.length - failed.length}/${names.length}`, lines });
    if (failed.length) failures.push(`${model} failed: ${failed.join(", ")}`);
  }
  console.table(rows);
  for (const line of failures) console.log(`\n${line}`);
}
