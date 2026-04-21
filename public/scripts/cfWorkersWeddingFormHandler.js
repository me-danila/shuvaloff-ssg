export default {
    async fetch(request, env) {
        // Preflight для CORS
        if (request.method === "OPTIONS") {
            return corsResponse(null, 204);
        }

        if (request.method !== "POST") {
            return corsResponse("Method Not Allowed", 405);
        }

        let data;
        try {
            data = await request.json();
        } catch {
            return corsResponse("Invalid JSON", 400);
        }

        // Простая защита — секретный ключ в заголовке
        if (request.headers.get("X-Form-Secret") !== env.FORM_SECRET) {
            return corsResponse("Forbidden", 403);
        }

        const text = formatMessage(data);

        await sendTelegram(text, env);

        return corsResponse(JSON.stringify({ ok: true }), 200);
    },
};

function formatMessage(data) {
    return [
        "📩 *Новая заявка с сайта*",
        ...Object.entries(data).map(([k, v]) => `*${k}:* ${v}`),
    ].join("\n");
}

async function sendTelegram(text, env) {
    await fetch(`https://api.telegram.org/bot${env.TG_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: env.TG_CHAT_ID,
            text,
            parse_mode: "Markdown",
        }),
    });
}

function corsResponse(body, status = 200) {
    return new Response(body, {
        status,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://academia-shuvaloff.ru",
            "Access-Control-Allow-Headers": "Content-Type, X-Form-Secret",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
        },
    });
}
