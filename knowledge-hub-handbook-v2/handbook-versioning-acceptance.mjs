import assert from "node:assert/strict";
import { HANDBOOK_VERSION, HANDBOOK_V2, HANDBOOK_V2_BY_ID, HANDBOOK_V2_CHAPTERS, HANDBOOK_CHAPTERS } from "./handbook-v2.js";

assert.equal(HANDBOOK_VERSION, "handbook-v2");
assert.equal(HANDBOOK_V2.length, 57);
assert.equal(new Set(HANDBOOK_V2.map((record) => record.id)).size, HANDBOOK_V2.length);
assert.equal(HANDBOOK_V2_CHAPTERS.length, 8);
assert.equal(HANDBOOK_CHAPTERS.length, 10, "The handbook index should list the ten defined chapters");
assert.equal(HANDBOOK_CHAPTERS.filter((chapter) => chapter.active).length, 8, "Bab 1, Bab 2, Bab 3, Bab 5, Bab 6, Bab 7, Bab 8, and Bab 9 are active in the prototype");
const accessChapter = HANDBOOK_CHAPTERS.find((chapter) => chapter.number === 8);
assert.equal(accessChapter?.title, "Akses, Keamanan, Kendala Sistem, dan Eskalasi", "Bab 8 title should use the Indonesian handbook wording");
const activeChapterIds = new Set(HANDBOOK_V2_CHAPTERS.map((chapter) => chapter.id));
for (const record of HANDBOOK_V2) {
  assert.ok(record.title && record.pageType && activeChapterIds.has(record.chapter));
  assert.ok(["draft", "draft_pilot"].includes(record.status));
  assert.ok(["verified", "partial"].includes(record.sourceStatus));
  assert.ok(record.aliases?.length && record.testQueries?.length);
  if (record.parentId) assert.ok(HANDBOOK_V2_BY_ID.has(record.parentId));
}
console.log(`Handbook v2 acceptance: PASSED | ${HANDBOOK_V2.length} pages across ${HANDBOOK_V2_CHAPTERS.length} active chapters`);
