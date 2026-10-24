import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 4173);
const spaRoute = /^\/(?:search|article|university|program|faq|ops-note)(?:\/|$)/;
const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon"
};

function safePath(requestPath) {
  const decoded = decodeURIComponent(requestPath);
  const relative = decoded.replace(/^\/+/, "");
  const resolved = path.resolve(root, relative);
  return resolved.startsWith(root + path.sep) || resolved === root ? resolved : null;
}

async function serve(request, response) {
  const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);
  let pathname = url.pathname;
  if (pathname === "/" || spaRoute.test(pathname)) pathname = "/index.html";
  const filePath = safePath(pathname);
  if (!filePath) {
    response.writeHead(403, { "content-type": "text/plain; charset=utf-8" });
    response.end("Forbidden");
    return;
  }
  try {
    const fileStats = await stat(filePath);
    if (!fileStats.isFile()) throw new Error("Not a file");
    const content = await readFile(filePath);
    response.writeHead(200, {
      "content-type": MIME_TYPES[path.extname(filePath).toLowerCase()] || "application/octet-stream",
      "cache-control": "no-cache"
    });
    if (request.method !== "HEAD") response.end(content);
    else response.end();
  } catch {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
}

http.createServer((request, response) => {
  serve(request, response).catch(() => {
    response.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    response.end("Internal server error");
  });
}).listen(port, "127.0.0.1", () => {
  console.log(`SA Knowledge Hub running at http://127.0.0.1:${port}`);
});
