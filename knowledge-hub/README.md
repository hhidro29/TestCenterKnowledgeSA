# SA Knowledge Hub Prototype

Search-first prototype for the Student Advisor knowledge hub. The current iteration is a static frontend with a small structured content catalog so it can be tested without API keys or a backend.

## Local development

From the repository root:

```bash
node knowledge-hub/server.mjs
```

Open <http://127.0.0.1:4173>.

The local server includes SPA fallback, so refreshing an article or FAQ URL
does not return 404. The app is also safe to serve with any static server when
only the homepage and in-app navigation are needed. There are no secrets and
no build step in this iteration.

## Vercel

Create a Vercel project from the repository and set **Root Directory** to `knowledge-hub`. Leave Framework Preset as `Other`; Vercel will serve `index.html` and the static assets directly.

The current root project still contains the earlier chatbot prototype. Keeping this app in its own directory makes the two iterations independently deployable and avoids coupling the search hub to the chatbot API.

## Content model

`data.js` and `faq-data.js` are the content boundary. The catalog supports four searchable record types:

- `article` — canonical source of truth for a topic.
- `faq` — an independently searchable question linked to its article with `parentArticleId`.
- `ops-note` — an independently searchable operational note linked to its article with `parentArticleId`.
- `entity` — a directory record such as a university or study program. University records use `entityType: "university"`; program records use `entityType: "study-program"` and `universityId`.

FAQ records are maintained in `faq-data.js` as the canonical collection. Each FAQ has its own stable `id`, question/title, answer, sources, and `parentArticleId`. The article page resolves that relation and renders the attached FAQ in its FAQ section; the same FAQ can also appear as an independent search result with a link back to the article.

All records share:

- `topic` and `subtopic`
- `title`, `summary`, and `snippet`
- `sources`

Articles can additionally contain `sections` and `ops` for the canonical page. FAQ content is resolved from `faq-data.js` rather than duplicated inside the article. Ops Note records remain independently searchable and open in their own detail view with a link back to the parent article. This keeps search results useful for repeated questions while preserving the article as the source of truth.

Entity records are generated from `scratch/top10_universities_data.json` and keep the extracted university fields in the catalog. Directory queries are routed deterministically: PTN/unggul/Jawa queries show university entities, Kedokteran queries show study-program entities, and guidance questions stay in the article/FAQ/Ops Note index.

The next iteration can replace `data.js` with a JSON endpoint, CMS export, or database-backed API without redesigning the result and article views. The comparison seed is kept out of the MVP search flow until entity-based comparison is designed.

## Routing

The frontend uses the History API so each view has a shareable URL while the
content remains a single static application:

- `/` — homepage
- `/search?q=...` — search results, with an optional `type` filter
- `/article/:id`, `/university/:id`, `/program/:id`, `/faq/:id`, `/ops-note/:id` — detail views
- `#section-id` — optional section anchor on a detail view

`vercel.json` rewrites these detail paths to `index.html`, which keeps direct
links and refreshes working when the `knowledge-hub` directory is deployed as
its own Vercel project.

## Current prototype scope

- Search-first homepage
- Google-like result list with matched snippets
- Topic filters
- Article detail views with related FAQ and Ops Note records
- University directory entities for 10 PTN Unggul in Java and human medicine programs
- FAQ accordions
- Ops guidance and source links on article pages
- Empty-result state

Search is deliberately local and deterministic in this iteration. No AI-generated answer is used in the search result or article content.

### Data kompetisi historis program studi

`quota-data.js` menyimpan snapshot historis dari endpoint Ruangguru `university-major-quota` untuk program studi yang memiliki pasangan `majorId` dan `universityId` terverifikasi. Setiap record memakai `studyProgramId` sebagai relasi ke entity program studi dan memiliki `history[]` berisi `year`, `applicant`, `quota`, `competitiveness`, `sourceUrl`, dan `extractedAt`. Field skor seleksi tidak disimpan atau ditampilkan. UI menampilkan tabel ini pada detail program studi sebagai konteks simulasi; angka peluang historis bukan prediksi penerimaan.
