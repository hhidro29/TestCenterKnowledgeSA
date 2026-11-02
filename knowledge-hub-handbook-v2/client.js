import { HANDBOOK_VERSION, HANDBOOK_V2, HANDBOOK_V2_BY_ID, HANDBOOK_V2_CHAPTERS, HANDBOOK_CHAPTERS } from "./handbook-v2.js";

const app = document.querySelector("#app");
const escapeHtml = (value = "") => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
const chapterByRoute = new Map(HANDBOOK_CHAPTERS.filter((chapter) => chapter.route).map((chapter) => [chapter.route.slice(1), chapter]));
const chapterById = new Map(HANDBOOK_V2_CHAPTERS.map((chapter) => [chapter.id, chapter]));
const chapterRoute = (chapterId) => chapterById.get(chapterId)?.route || HANDBOOK_CHAPTERS.find((chapter) => chapter.id === chapterId)?.route || "/";
const handbookPath = (id = "") => {
  if (!id) return "/";
  const record = HANDBOOK_V2_BY_ID.get(id);
  return `${chapterRoute(record?.chapter)}/${encodeURIComponent(id)}`;
};
const slugify = (value = "") => normalizeSearch(value).replace(/ /g, "-").slice(0, 70) || "bagian";
const sectionAnchor = (recordId, section, index) => `${recordId}--${String(index + 1).padStart(2, "0")}-${slugify(section.heading || section.question || "bagian")}`;

const searchableText = (value) => {
  if (value == null) return "";
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (Array.isArray(value)) return value.map(searchableText).join(" ");
  if (typeof value === "object") return Object.values(value).map(searchableText).join(" ");
  return "";
};
const normalizeSearch = (value) => searchableText(value).toLowerCase().replace(/[^a-z0-9À-ÿ]+/gi, " ").replace(/\s+/g, " ").trim();
const searchIndex = HANDBOOK_V2.filter((record) => record.pageType !== "index").map((record) => {
  const sections = record.sections || [];
  const sectionEntries = sections.map((section, index) => ({ section, index, anchor: sectionAnchor(record.id, section, index) }));
  const headings = sections.map((section) => section.heading || section.question || "").join(" ");
  const content = sections.map((section) => searchableText(section)).join(" ");
  const aliases = searchableText(record.aliases);
  return { record, title: normalizeSearch(record.title), aliases: normalizeSearch(aliases), summary: normalizeSearch(record.summary), headings: normalizeSearch(headings), content: normalizeSearch(content), sections: sectionEntries.map(({ section, anchor }) => ({ anchor, heading: normalizeSearch(section.heading || section.question), displayHeading: section.heading || section.question || "Bagian terkait", text: normalizeSearch(searchableText(section)), preview: searchableText(section).replace(/\s+/g, " ").trim().slice(0, 220) })), all: normalizeSearch([record.title, aliases, record.summary, headings, content, record.metadata, record.sources]) };
});
function searchRecords(query) {
  const normalized = normalizeSearch(query);
  if (!normalized) return [];
  const terms = normalized.split(" ").filter(Boolean);
  return searchIndex.map((entry) => {
    let score = 0;
    if (entry.title.includes(normalized)) score += 40;
    if (entry.aliases.includes(normalized)) score += 28;
    if (entry.summary.includes(normalized)) score += 20;
    if (entry.headings.includes(normalized)) score += 16;
    if (entry.content.includes(normalized)) score += 8;
    const matchedTerms = terms.filter((term) => entry.all.includes(term)).length;
    const matchingSection = entry.sections.map((section) => ({ section, score: terms.filter((term) => `${section.heading} ${section.text}`.includes(term)).length })).sort((a, b) => b.score - a.score)[0];
    score += matchedTerms * 3;
    return { ...entry, score, matchedTerms, matchingSection: matchingSection?.score ? matchingSection.section : null };
  }).filter((entry) => {
    const requiredTerms = terms.length >= 4 ? Math.ceil(terms.length * 0.35) : terms.length > 1 ? 2 : 1;
    return entry.score > 0 && entry.matchedTerms >= requiredTerms;
  }).sort((a, b) => b.score - a.score || a.record.title.localeCompare(b.record.title));
}
function searchMarkup(results, query) {
  if (!query) return `<p class="search-empty">Ketik kata kunci, nama fitur, atau pertanyaan yang biasa ditanyakan.</p>`;
  if (!results.length) return `<p class="search-empty">Belum ada artikel yang cocok. Coba kata yang lebih singkat, misalnya “profiling”, “tryout”, atau “dashboard”.</p>`;
  return `<p class="search-count">${results.length} kandidat memuat beberapa kata inti dari pertanyaan ini. Pilih berdasarkan bagian dan cuplikan jawabannya.</p><div class="search-results">${results.map(({ record, matchingSection }) => { const kind = record.pageType === "workflow" ? "Alur Kerja" : record.pageType === "ops_note" ? "Catatan Operasional" : "Topik"; const target = matchingSection?.anchor ? `${handbookPath(record.id)}#${matchingSection.anchor}` : handbookPath(record.id); const sectionLabel = matchingSection?.displayHeading ? `Bagian terkait: ${matchingSection.displayHeading}` : "Buka artikel"; const preview = matchingSection?.preview || record.summary || ""; return `<a class="search-result" href="${escapeHtml(target)}"><span class="search-result-kind">${escapeHtml(kind)} · Bab ${escapeHtml(String(record.chapter).split("-")[0])}</span><strong>${escapeHtml(record.title)}</strong><span class="search-result-section">${escapeHtml(sectionLabel)}</span><span class="search-result-preview">${escapeHtml(preview)}${preview.length >= 220 ? "…" : ""}</span></a>`; }).join("")}</div>`;
}

function parseRoute() {
  const parts = location.pathname.split("/").filter(Boolean).map((part) => decodeURIComponent(part));
  if (!parts.length) return { kind: "home" };
  if (chapterByRoute.has(parts[0]) && !parts[1]) return { kind: "chapter", route: parts[0] };
  if (chapterByRoute.has(parts[0]) && parts[1] && HANDBOOK_V2_BY_ID.has(parts.slice(1).join("/"))) return { kind: "detail", id: parts.slice(1).join("/") };
  return { kind: "home" };
}

function go(path) { history.pushState({}, "", path); render(); window.scrollTo({ top: 0, behavior: "instant" }); }

function shell(content) {
  return `<header class="site-header"><a class="brand" href="/"><span class="brand-mark">▤</span><span class="brand-copy"><strong>SA Handbook</strong><small>Panduan Penasihat Akademik</small></span></a><nav class="site-nav" aria-label="Navigasi handbook"><a class="site-nav-active" href="/">Semua Bab</a><a href="/">Alur Kerja</a><a href="/">Catatan Operasional</a><a href="/">Yang Baru</a></nav><div class="header-actions"><button class="header-search" type="button" data-focus-search aria-label="Cari di handbook"><span aria-hidden="true">⌕</span><span class="header-search-label">Cari di handbook...</span><kbd>⌘K</kbd></button><span class="profile-mark">SA</span></div></header><div class="search-overlay" id="searchOverlay" hidden><div class="search-panel" role="dialog" aria-modal="true" aria-labelledby="searchTitle"><div class="search-panel-head"><div><p class="eyebrow">Pencarian handbook</p><h2 id="searchTitle">Cari di seluruh handbook</h2><p class="search-panel-subtitle">Temukan bab, artikel, FAQ, atau langkah kerja.</p></div><button type="button" class="search-close" data-close-search aria-label="Tutup pencarian">×</button></div><div class="global-search-box"><span aria-hidden="true">⌕</span><input id="globalSearch" type="search" placeholder="Contoh: profiling belum submitted atau akses dashboard" autocomplete="off"/><kbd>Esc</kbd></div><div id="searchResults" aria-live="polite">${searchMarkup([], "")}</div></div></div>${content}`;
}

function metaMarkup(record) {
  const statusLabel = ["draft", "draft_pilot"].includes(record.status) ? "Sudah tersedia" : "Rujukan aktif";
  return `<aside class="meta" aria-label="Status halaman"><span class="version-pill">${escapeHtml(statusLabel)}</span><span>${escapeHtml(record.metadata?.period || "AY 2026/2027")}</span></aside>`;
}

function linkCard(link, compact = false, anchor = false) {
  const record = HANDBOOK_V2_BY_ID.get(link.id);
  if (!record) return "";
  const kind = record.pageType === "workflow" ? "Workflow" : record.pageType === "ops_note" ? "Catatan Operasional" : "Topik";
  const currentChapter = chapterByRoute.get(location.pathname.split("/").filter(Boolean)[0] || "");
  const recordChapter = chapterById.get(record.chapter);
  const target = anchor && currentChapter?.id === record.chapter ? `#${record.id}` : `${recordChapter?.route || "/"}#${record.id}`;
  if (anchor && compact) return `<a class="inline-reference" href="${escapeHtml(target)}">${escapeHtml(link.label || record.title)}</a>`;
  const content = `<span class="kind">${kind}</span><strong>${escapeHtml(link.label || record.title)}</strong>${compact ? "" : `<span>${escapeHtml(record.summary)}</span>`}<b>→</b>`;
  return anchor ? `<a class="link-card${compact ? " inline-card" : ""}" href="${escapeHtml(target)}">${content}</a>` : `<button class="link-card${compact ? " inline-card" : ""}" data-open="${escapeHtml(record.id)}">${content}</button>`;
}

function listItemMarkup(item) {
  if (typeof item === "string") return escapeHtml(item);
  if (Array.isArray(item?.links) && item.links.length) {
    const before = item?.before ? escapeHtml(item.before) : "";
    const after = item?.after ? escapeHtml(item.after) : "";
    const joiner = escapeHtml(item?.joiner || " dan ");
    const links = item.links.map((link) => {
      const label = link?.text || link?.label || "";
      return `<a class="step-link" href="${escapeHtml(link?.url || "")}" target="_blank" rel="noreferrer">${escapeHtml(label)}</a>`;
    }).join(joiner);
    return `${before}${links}${after}`;
  }
  const label = item?.linkText || item?.text || item?.label || "";
  const url = item?.url || item?.link?.url;
  if (!url) return escapeHtml(label);
  const before = item?.before ? escapeHtml(item.before) : "";
  const after = item?.after ? escapeHtml(item.after) : "";
  return `${before}<a class="step-link" href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(label)}</a>${after}`;
}

function sectionMarkup(section, { anchor = false, id = "" } = {}) {
  const sectionId = id ? ` id="${escapeHtml(id)}"` : "";
  if (section.heading === "Pilih kebutuhanmu" && section.links?.length) return `<section${sectionId} class="section choice"><h2>${escapeHtml(section.heading)}</h2><div class="card-grid">${section.links.map((link) => linkCard(link, false, anchor)).join("")}</div></section>`;
  const related = section.links?.length ? anchor ? `<p class="related-inline">Lihat juga: ${section.links.map((link) => linkCard(link, true, true)).join(" · ")}.</p>` : `<div class="inline-links">${section.links.map((link) => linkCard(link, true)).join("")}</div>` : "";
  const body = [section.body ? `<p>${escapeHtml(section.body)}</p>` : "", section.bullets?.length ? `<ul>${section.bullets.map((item) => `<li>${listItemMarkup(item)}</li>`).join("")}</ul>` : "", section.steps?.length ? `<ol>${section.steps.map((item) => `<li>${listItemMarkup(item)}</li>`).join("")}</ol>` : "", related].join("");
  if (section.type === "qa") {
    const answer = [section.answer ? `<p><strong>Jawaban:</strong> ${escapeHtml(section.answer)}</p>` : "", section.bullets?.length ? `<ul>${section.bullets.map((item) => `<li>${listItemMarkup(item)}</li>`).join("")}</ul>` : "", section.steps?.length ? `<ol>${section.steps.map((item) => `<li>${listItemMarkup(item)}</li>`).join("")}</ol>` : "", related].join("");
    return `<section${sectionId} class="section section-qa"><h2>${escapeHtml(section.question || section.heading || "")}</h2>${answer}</section>`;
  }
  return `<section${sectionId} class="section"><h2>${escapeHtml(section.heading)}</h2>${body}</section>`;
}

function sourcesMarkup(sources = []) { return sources.length ? `<section class="evidence"><h2>Sumber dan rujukan</h2><ul>${sources.map((source) => `<li><a href="${escapeHtml(source.url)}" target="_blank" rel="noreferrer">${escapeHtml(source.label)} ↗</a></li>`).join("")}</ul></section>` : ""; }

function flatRecordMarkup(record, index) {
  const label = record.pageType === "workflow" ? "Alur kerja" : record.pageType === "ops_note" ? "Catatan Operasional" : "Topik";
  return `<section id="${escapeHtml(record.id)}" class="flat-record flat-record-${escapeHtml(record.pageType)}"><p class="eyebrow">${escapeHtml(label)}</p><h2>${escapeHtml(record.title)}</h2><p class="flat-record-summary">${escapeHtml(record.summary)}</p>${record.sections.map((section, sectionIndex) => sectionMarkup(section, { anchor: true, id: sectionAnchor(record.id, section, sectionIndex) })).join("")}</section>`;
}

function homeView() {
  const latestArticles = HANDBOOK_V2
    .filter((record) => record.pageType !== "index")
    .map((record, index) => ({ record, index }))
    .sort((a, b) => String(b.record.metadata?.updatedAt || "").localeCompare(String(a.record.metadata?.updatedAt || "")) || b.index - a.index)
    .slice(0, 3)
    .map(({ record }) => record);
  return shell(`<main class="handbook-home"><div class="home-shell"><section class="home-catalog-hero"><div class="home-catalog-title"><h1>Ensiklopedia Kerja SA</h1><p>Panduan praktis untuk memahami konteks siswa dan menentukan langkah kerja.</p></div><button class="hero-search" type="button" data-focus-search aria-label="Cari artikel dan jawaban"><span aria-hidden="true">⌕</span><span class="hero-search-label">Cari artikel, bab, atau pertanyaan...</span><kbd>⌘ K</kbd></button></section><div class="home-content-grid"><section class="chapter-registry" aria-labelledby="chapter-library-title"><div class="registry-head"><div><p class="eyebrow">Isi handbook</p><h2 id="chapter-library-title">Daftar bab</h2><p>Pilih bab untuk membaca penjelasan dan alur kerja.</p></div><span class="registry-count">${HANDBOOK_CHAPTERS.length} bab</span></div><div class="registry-columns" aria-hidden="true"><span>No.</span><span>Bab dan deskripsi</span></div><div class="chapter-rows" id="chapterContainer">${HANDBOOK_CHAPTERS.map((chapter) => `<article class="chapter-row-home${chapter.active ? "" : " is-planned"}" data-status="${chapter.active ? "active" : "planned"}" data-search="${escapeHtml(`${chapter.title} ${chapter.description}`.toLowerCase())}"><div class="chapter-number">${String(chapter.number).padStart(2, "0")}</div><div class="chapter-copy"><a href="${escapeHtml(chapter.route || "#")}" data-chapter-route="${escapeHtml(chapter.route || "")}">${escapeHtml(chapter.title)}</a><p>${escapeHtml(chapter.description)}</p><div class="chapter-tags"><span>${chapter.active ? "Sudah tersedia" : "Dalam penyusunan"}</span></div></div></article>`).join("")}</div><p class="home-empty" id="homeEmpty" hidden>Tidak ada bab yang cocok dengan pencarianmu.</p></section><aside class="home-sidebar"><section class="sidebar-card latest-card"><p class="eyebrow">3 artikel terbaru</p><h2>Yang baru ditambahkan</h2><div class="latest-list">${latestArticles.map((record) => { const kind = record.pageType === "workflow" ? "Alur Kerja" : record.pageType === "ops_note" ? "Catatan Operasional" : "Topik"; return `<a class="latest-item" href="${escapeHtml(handbookPath(record.id))}"><span class="latest-kind">${escapeHtml(kind)}</span><strong>${escapeHtml(record.title)}</strong><span>${escapeHtml(record.summary)}</span></a>`; }).join("")}</div></section><section class="sidebar-card sidebar-muted"><p class="eyebrow">Jenis halaman</p><div><span class="legend-dot topic"></span><strong>Topik</strong><small>Penjelasan dan konteks</small></div><div><span class="legend-dot workflow"></span><strong>Alur Kerja</strong><small>Panduan saat perlu bertindak</small></div><div><span class="legend-dot ops"></span><strong>Catatan Operasional</strong><small>Informasi yang dapat berubah</small></div></section></aside></div></div></main>`);
}

function chapterView(routeSegment) {
  const chapter = chapterByRoute.get(routeSegment);
  const chapterDefinition = chapterById.get(chapter.id);
  const index = HANDBOOK_V2_BY_ID.get(chapterDefinition.indexId);
  const records = HANDBOOK_V2.filter((record) => record.chapter === index.chapter && record.id !== index.id);
  const intro = [index.summary, index.intro].filter(Boolean).join(" ");
  const toc = records.map((record) => `<li><a href="#${escapeHtml(record.id)}">${escapeHtml(record.title)}</a></li>`).join("");
  const articleContent = records.map(flatRecordMarkup).join("");
  return shell(`<main id="top" class="main handbook-article-main"><div class="topbar"><button class="back" data-home>← Kembali ke Handbook</button></div><div class="breadcrumb">SA Handbook <b>›</b> Bab ${chapter.number} · ${escapeHtml(chapter.title)}</div><div class="article-layout"><aside class="article-sidebar"><nav class="table-of-contents" aria-label="Daftar isi Bab ${chapter.number}"><details class="toc-disclosure" open><summary>Daftar isi Bab ${chapter.number}</summary><div class="toc-body"><ol>${toc}</ol><div class="toc-legend" aria-label="Jenis bagian"><span><i class="legend-dot topic"></i>Topik</span><span><i class="legend-dot workflow"></i>Alur Kerja</span><span><i class="legend-dot ops"></i>Catatan Operasional</span></div></div></details></nav></aside><article class="flat-document"><section class="hero compact"><p class="eyebrow">BAB ${chapter.number}</p><h1>${escapeHtml(index.title)}</h1><p>${escapeHtml(intro)}</p>${metaMarkup(index)}</section>${articleContent}${sourcesMarkup(index.sources)}</article></div></main>`);
}

function detailView(record) {
  const parent = record.parentId ? HANDBOOK_V2_BY_ID.get(record.parentId) : null;
  const chapter = chapterByRoute.get(chapterRoute(record.chapter).slice(1));
  return shell(`<main class="main"><div class="topbar"><button class="back" data-chapter-route="${escapeHtml(chapter?.route || "/")}">← Kembali ke Bab ${chapter?.number ?? ""}</button><span>${escapeHtml(record.pageType === "workflow" ? "Alur kerja" : record.pageType === "ops_note" ? "Catatan Operasional" : "Topik")}</span></div><div class="breadcrumb">SA Handbook <b>›</b> Bab ${chapter?.number ?? ""} <b>›</b> ${escapeHtml(record.title)}</div><article id="${escapeHtml(record.id)}" class="page page-${escapeHtml(record.pageType)}"><p class="eyebrow">${escapeHtml(record.pageType === "workflow" ? "ALUR KERJA" : record.pageType === "ops_note" ? "CATATAN OPERASIONAL" : "TOPIK")}</p><h1>${escapeHtml(record.title)}</h1><p class="summary">${escapeHtml(record.summary)}</p>${metaMarkup(record)}${parent ? `<div class="parent">Bagian dari <button data-open="${escapeHtml(parent.id)}">${escapeHtml(parent.title)} →</button></div>` : ""}${record.sections.map((section, sectionIndex) => sectionMarkup(section, { id: sectionAnchor(record.id, section, sectionIndex) })).join("")}${sourcesMarkup(record.sources)}<section class="freshness"><h2>Periode dan pembaruan</h2><p>${escapeHtml(record.metadata?.freshness || "Gunakan rilis Tim Akademik terbaru bila informasi berubah.")}</p></section></article></main>`);
}

function render() {
  const route = parseRoute();
  const record = route.id ? HANDBOOK_V2_BY_ID.get(route.id) : null;
  app.innerHTML = record ? detailView(record) : route.kind === "chapter" ? chapterView(route.route) : homeView();
  document.title = record ? `${record.title} · SA Handbook v2` : "SA Handbook v2";
  document.querySelectorAll("[data-open]").forEach((button) => button.addEventListener("click", () => go(handbookPath(button.dataset.open))));
  document.querySelectorAll("[data-chapter-route]").forEach((button) => button.addEventListener("click", () => go(button.dataset.chapterRoute || "/")));
  document.querySelectorAll("[data-home]").forEach((button) => button.addEventListener("click", () => go("/")));
  const overlay = document.querySelector("#searchOverlay");
  const searchInput = document.querySelector("#globalSearch");
  const searchResults = document.querySelector("#searchResults");
  const closeSearch = () => { if (overlay) overlay.hidden = true; };
  const openSearch = () => { if (!overlay || !searchInput) return; overlay.hidden = false; searchInput.focus(); searchInput.select(); };
  document.querySelectorAll("[data-focus-search]").forEach((button) => button.addEventListener("click", openSearch));
  document.querySelectorAll("[data-close-search]").forEach((button) => button.addEventListener("click", closeSearch));
  overlay?.addEventListener("click", (event) => { if (event.target === overlay) closeSearch(); });
  searchInput?.addEventListener("input", () => { if (searchResults) searchResults.innerHTML = searchMarkup(searchRecords(searchInput.value), searchInput.value.trim()); });
  document.addEventListener("keydown", (event) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); openSearch(); } if (event.key === "Escape" && overlay && !overlay.hidden) closeSearch(); }, { once: true });
  if (route.kind === "home") {
    const rows = [...document.querySelectorAll(".chapter-row-home")];
    const empty = document.querySelector("#homeEmpty");
    rows.forEach((row) => {
      const link = row.querySelector("a[data-chapter-route]");
      if (!link) return;
      row.addEventListener("click", (event) => {
        if (event.target.closest("a")) return;
        go(link.getAttribute("href") || "/");
      });
    });
    let activeFilter = "all";
    const applyHomeFilters = () => {
      const query = (document.querySelector("#homeSearch")?.value || "").trim().toLowerCase();
      let visible = 0;
      rows.forEach((row) => {
        const matchesStatus = activeFilter === "all" || row.dataset.status === activeFilter;
        const matchesQuery = !query || row.dataset.search.includes(query);
        row.hidden = !(matchesStatus && matchesQuery);
        if (!row.hidden) visible += 1;
      });
      if (empty) empty.hidden = visible > 0;
    };
    document.querySelector("#homeSearch")?.addEventListener("input", applyHomeFilters);
    document.querySelectorAll("[data-focus-search]").forEach((button) => button.addEventListener("click", () => document.querySelector("#homeSearch")?.focus()));
  }
  if (route.kind === "chapter") {
    const tocDisclosure = document.querySelector(".toc-disclosure");
    const syncTocDisclosure = () => {
      if (!tocDisclosure) return;
      if (window.matchMedia("(max-width: 980px)").matches) tocDisclosure.removeAttribute("open");
      else tocDisclosure.setAttribute("open", "");
    };
    syncTocDisclosure();
    window.addEventListener("resize", syncTocDisclosure, { passive: true });
    const targets = [...document.querySelectorAll(".flat-record[id]")];
    const links = new Map([...document.querySelectorAll(".table-of-contents a")].map((link) => [link.hash.slice(1), link]));
    const updateCurrentSection = () => {
      const cutoff = 96;
      let current = targets[0];
      for (const target of targets) {
        if (target.getBoundingClientRect().top <= cutoff) current = target;
        else break;
      }
      for (const link of links.values()) link.removeAttribute("aria-current");
      if (current) links.get(current.id)?.setAttribute("aria-current", "true");
    };
    window.addEventListener("scroll", updateCurrentSection, { passive: true });
    updateCurrentSection();
    if (location.hash) {
      const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (target) requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
    }
  }
  if (route.kind === "detail" && location.hash) {
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
  }
}

window.addEventListener("popstate", render);
render();
