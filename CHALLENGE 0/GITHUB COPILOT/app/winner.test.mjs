import { test } from "node:test";
import assert from "node:assert/strict";
import { winner } from "./winner.js";

test("winner", () => {
  assert.equal(winner(["X", "X", "X", null, "O", "O", null, null, null]), "X");
  assert.equal(winner(["O", "X", null, "X", "O", null, null, null, "O"]), "O");
  assert.equal(winner(Array(9).fill(null)), null);
  assert.equal(winner(["X", "O", "X", "X", "O", "O", "O", "X", "X"]), null);
});
