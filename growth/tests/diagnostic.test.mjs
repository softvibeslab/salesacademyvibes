import { test } from "node:test";
import assert from "node:assert/strict";
import {
  evaluateDiagnostic,
  recommendations,
} from "../site/assets/diagnostic.mjs";
test("initial process identifies coordination without contact", () => {
  const r = evaluateDiagnostic([0, 0, 1, 0, 1, 0]);
  assert.equal(r.total, 2);
  assert.deepEqual(r.priorities, ["coordination"]);
  assert.equal(r.band, "essential");
});
test("partial process identifies evidence", () => {
  const r = evaluateDiagnostic([2, 1, 2, 1, 0, 1]);
  assert.equal(r.total, 7);
  assert.deepEqual(r.priorities, ["evidence"]);
});
test("all defined recommends baseline, not certification", () => {
  const r = evaluateDiagnostic([2, 2, 2, 2, 2, 2]);
  assert.equal(r.total, 12);
  assert.equal(r.baseline, true);
  assert.equal(r.band, "pilot");
});
test("unknowns preserved and ties transparent", () => {
  const r = evaluateDiagnostic([
    "unknown",
    "unknown",
    "unknown",
    "unknown",
    "unknown",
    "unknown",
  ]);
  assert.equal(r.unknown, 6);
  assert.deepEqual(r.priorities, ["coordination", "practice", "evidence"]);
});
test("missing and invalid answers never evaluated", () => {
  assert.throws(() => evaluateDiagnostic([0, 0, null, 1, 2, 0]));
  assert.throws(() => evaluateDiagnostic([0, 0, 1, 2, 3, 0]));
  assert.throws(() => evaluateDiagnostic([0]));
});
test("boundaries and determinism", () => {
  assert.equal(evaluateDiagnostic([2, 2, 0, 0, 0, 0]).band, "essential");
  assert.equal(evaluateDiagnostic([2, 2, 1, 0, 0, 0]).band, "routine");
  assert.equal(evaluateDiagnostic([2, 2, 2, 2, 0, 0]).band, "routine");
  assert.equal(evaluateDiagnostic([2, 2, 2, 2, 1, 0]).band, "pilot");
  const a = [2, 1, 1, 0, 2, 2];
  assert.deepEqual(evaluateDiagnostic(a), evaluateDiagnostic(a));
  assert.deepEqual(a, [2, 1, 1, 0, 2, 2]);
});

import { readFileSync } from "node:fs";
test("recommendations link to seeded resources and track immutable IDs", () => {
  const seed = JSON.parse(
    readFileSync(new URL("../content/seed.json", import.meta.url)),
  );
  for (const rec of Object.values(recommendations)) {
    const resource = seed.resources.find((r) => r.id === rec.id);
    assert.ok(resource, `Unknown resource ID: ${rec.id}`);
    assert.equal(resource.slug, rec.slug);
    assert.equal(resource.status, "published");
  }
});
