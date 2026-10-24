import assert from "node:assert/strict";
import { KNOWLEDGE } from "./data.js";

const universities = KNOWLEDGE.filter((item) => item.entityType === "university");
const programs = KNOWLEDGE.filter((item) => item.entityType === "study-program");
const nonUi = universities.filter((item) => item.abbreviation !== "UI");

assert.equal(universities.length, 10, "catalog keeps the 10 university entities");
assert.equal(nonUi.length, 9, "catalog adds all non-UI universities");
for (const university of nonUi) {
  assert.ok(university.catalog?.length, `${university.abbreviation} has faculty catalog`);
  const catalogCount = university.catalog.reduce((total, faculty) => total + faculty.programs.length, 0);
  assert.equal(catalogCount, university.majorCount, `${university.abbreviation} catalog count matches extracted majorCount`);
  assert.ok(university.catalog.every((faculty) => faculty.programs.every((program) => program.url.startsWith("https://app.ruangguru.com/kampus/"))), `${university.abbreviation} program links are canonical catalog URLs`);
}

assert.equal(programs.length, 529, "all extracted programs remain represented");
const priority = [
  ["UGM", "Manajemen"],
  ["UGM", "Ilmu Komunikasi"],
  ["UGM", "Psikologi"],
  ["UGM", "Ilmu Komputer"],
  ["ITS", "Teknik Informatika"],
  ["UB", "Psikologi"],
  ["UNS", "Informatika"]
];
for (const [abbreviation, name] of priority) {
  const records = programs.filter((item) => item.universityAbbreviation === abbreviation && item.name.toLocaleLowerCase("id-ID") === name.toLocaleLowerCase("id-ID"));
  assert.equal(records.length, 1, `${name} ${abbreviation} is indexed exactly once`);
  assert.ok(records[0].profile, `${name} ${abbreviation} has a sourced profile`);
  assert.ok(records[0].catalogUrl?.startsWith("https://app.ruangguru.com/kampus/"), `${name} ${abbreviation} has a catalog link`);
}

const gapRecords = programs.filter((item) => item.universityAbbreviation !== "UI" && !item.profile);
assert.ok(gapRecords.length > 0, "programs without rich source details are retained with an explicit gap");
assert.ok(gapRecords.every((item) => item.metadata?.dataGap), "program detail gaps are explicit");
console.log(`PASS | university catalog | ${universities.length} universities | ${programs.length} programs | ${priority.length} priority profiles checked | ${gapRecords.length} explicit gaps`);
