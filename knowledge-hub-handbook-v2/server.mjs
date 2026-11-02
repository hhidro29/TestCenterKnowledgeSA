import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 4174);
const mime = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8" };
const safePath = (requestPath) => { const decoded = decodeURIComponent(requestPath).replace(/^\/+/, ""); const resolved = path.resolve(root, decoded); return resolved.startsWith(root + path.sep) || resolved === root ? resolved : null; };

async function serve(request, response) {
  const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);
  let pathname = url.pathname;
  if (pathname === "/" || pathname.startsWith("/chapter-")) pathname = "/index.html";
  const filePath = safePath(pathname);
  if (!filePath) return response.writeHead(403).end("Forbidden");
  try { const fileStats = await stat(filePath); if (!fileStats.isFile()) throw new Error("Not a file"); const body = await readFile(filePath); response.writeHead(200, { "content-type": mime[path.extname(filePath)] || "application/octet-stream", "cache-control": "no-cache" }); response.end(body); }
  catch { response.writeHead(404, { "content-type": "text/plain; charset=utf-8" }).end("Not found"); }
}

http.createServer((request, response) => serve(request, response).catch(() => response.writeHead(500).end("Internal server error"))).listen(port, "127.0.0.1", () => console.log(`SA Handbook v2 running at http://127.0.0.1:${port}`));
