import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/site";

export const dynamic = "force-static";

// AI / GEO crawlers granted explicit crawl access so the site can surface in
// LLM answers and AI search. Names are the public user-agent tokens each
// vendor documents; explicit Allow entries make intent unambiguous even though
// the wildcard rule above already permits them.
const AI_CRAWLERS = [
    "GPTBot", // OpenAI training/crawl
    "OAI-SearchBot", // OpenAI search index
    "ChatGPT-User", // ChatGPT live browsing
    "ClaudeBot", // Anthropic crawl
    "anthropic-ai", // Anthropic (legacy token)
    "PerplexityBot", // Perplexity index
    "Perplexity-User", // Perplexity live fetch
    "Google-Extended", // Google Gemini / Vertex
    "Applebot-Extended", // Apple Intelligence
    "CCBot", // Common Crawl
    "Amazonbot", // Amazon / Alexa
    "Bytespider", // ByteDance / TikTok
    "meta-externalagent", // Meta AI
    "YandexBot", // Yandex search
];

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            { userAgent: "*", allow: "/" },
            ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    };
}
