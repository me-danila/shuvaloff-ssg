// Простой статический сервер для превью SSG-сборки (out/)
const root = new URL("../out/", import.meta.url).pathname;

Bun.serve({
    port: 4173,
    async fetch(req) {
        const url = new URL(req.url);
        let pathname = decodeURIComponent(url.pathname);
        if (pathname.endsWith("/")) pathname += "index.html";
        let file = Bun.file(root + pathname);
        if (!(await file.exists())) {
            file = Bun.file(`${root + pathname}/index.html`);
        }
        if (!(await file.exists())) {
            return new Response("Not found", { status: 404 });
        }
        return new Response(file, {
            headers: { "Cache-Control": "no-store" },
        });
    },
});

console.log("SSG preview on http://localhost:4173");
