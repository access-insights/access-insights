import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

import { validateProductPack } from "@access-insights/screen-reader-harness";

const productRoot = process.cwd();
const manifestPath = resolve(
  productRoot,
  "tests/screen-reader/apps/access-insights-website.json"
);
const scenarioPath = resolve(
  productRoot,
  "tests/screen-reader/scenarios/homepage-critical.json"
);
const homepagePath = resolve(productRoot, "index.html");

test("central harness validates the website product pack", async () => {
  assert.deepEqual(await validateProductPack(productRoot), {
    valid: true,
    applications: 1,
    scenarios: 1
  });
});

test("reader support is limited to NVDA and Narrator", async () => {
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  assert.deepEqual(manifest.allowedReaders, ["nvda", "narrator"]);
});

test("the critical scenario remains local and read-only", async () => {
  const scenario = JSON.parse(await readFile(scenarioPath, "utf8"));
  assert.equal(scenario.suite, "critical");
  assert.equal(scenario.environment, "local");
  assert.equal(scenario.risk, "read-only");
  assert.ok(scenario.steps.length > 0);
  assert.equal(
    scenario.steps.some(({ action }) => action === "activate" || action === "type_text"),
    false
  );
});

test("declared heading expectations match the homepage in order", async () => {
  const scenario = JSON.parse(await readFile(scenarioPath, "utf8"));
  const homepage = await readFile(homepagePath, "utf8");
  const headings = [...homepage.matchAll(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi)]
    .map((match) => match[1].replace(/<[^>]+>/g, "").trim());
  const expectedHeadings = scenario.steps
    .filter(({ action }) => action === "next_heading")
    .map(({ expect }) => expect.nameContains);

  let cursor = 0;
  for (const expectedHeading of expectedHeadings) {
    const index = headings.findIndex(
      (heading, headingIndex) => headingIndex >= cursor && heading.includes(expectedHeading)
    );
    assert.notEqual(index, -1, `Missing or out-of-order heading: ${expectedHeading}`);
    cursor = index + 1;
  }
});
