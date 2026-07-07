// Отправка URL в IndexNow (Яндекс, Bing и др.; Google IndexNow не поддерживает —
// для него достаточно sitemap.xml).
//
// Использование:
//   node scripts/indexnow.mjs                       # все статьи блога + /blog/
//   node scripts/indexnow.mjs /blog/moya-statya/    # конкретные пути
//
// Запускать после деплоя: ключ должен быть доступен по
// https://academia-shuvaloff.ru/<key>.txt (лежит в public/).

import fs from "node:fs";
import path from "node:path";

const SITE_URL = "https://academia-shuvaloff.ru";
const HOST = new URL(SITE_URL).host;
const KEY = "c94a5ce0a2634a601d6d8417143eca71";

function blogUrls() {
    const dir = path.join(process.cwd(), "content", "blog");
    if (!fs.existsSync(dir)) return [];
    const slugs = fs
        .readdirSync(dir)
        .filter((f) => f.endsWith(".mdx"))
        .map((f) => f.replace(/\.mdx$/, ""));
    return ["/blog/", ...slugs.map((slug) => `/blog/${slug}/`)];
}

const args = process.argv.slice(2);
const paths = args.length > 0 ? args : blogUrls();
const urlList = paths.map((p) => new URL(p, SITE_URL).toString());

if (urlList.length === 0) {
    console.log("Нет URL для отправки.");
    process.exit(0);
}

const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
        host: HOST,
        key: KEY,
        keyLocation: `${SITE_URL}/${KEY}.txt`,
        urlList,
    }),
});

console.log(`IndexNow: ${response.status} ${response.statusText}`);
console.log(urlList.join("\n"));
if (!response.ok && response.status !== 202) {
    process.exit(1);
}
