const fs = require("node:fs");
const path = require("node:path");

const ROOT = __dirname;
const SEARCH_DIRS = ["app", "components", "data"];
const FILE_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".json"]);
const IMAGE_URL_PATTERN =
    /https?:\/\/[^\s"'`]+?\.(?:gif|jpe?g|png|webp)(?:\?[^\s"'`]*)?/gi;

function walk(dir, collector) {
    if (!fs.existsSync(dir)) {
        return;
    }

    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            walk(fullPath, collector);
            continue;
        }

        if (!FILE_EXTENSIONS.has(path.extname(entry.name))) {
            continue;
        }

        const fileContent = fs.readFileSync(fullPath, "utf8");
        const matches = fileContent.match(IMAGE_URL_PATTERN);

        if (!matches) {
            continue;
        }

        for (const match of matches) {
            collector.add(match);
        }
    }
}

const remoteImages = new Set();

for (const dir of SEARCH_DIRS) {
    walk(path.join(ROOT, dir), remoteImages);
}

module.exports = Array.from(remoteImages).sort();
