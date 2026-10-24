// Web3Forms: прием заявок без своего бэкенда. POST на их endpoint с публичным
// access_key → письмо на почту, привязанную к ключу в личном кабинете
// web3forms.com. В бандле ключ не секрет: спам отсекает honeypot-поле
// `botcheck` + лимиты на стороне сервиса.

export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

/** Ключ заявок с сайта (фотосессия, поздравления от графской семьи). */
export const WEB3FORMS_SITE_ACCESS_KEY = "441c373c-1f8a-4fa5-8b06-92740270235d";

/** Отправляет заявку; true — Web3Forms принял ее (`success` в ответе). */
export async function submitWeb3Form(
    accessKey: string,
    payload: Record<string, string | boolean>,
): Promise<boolean> {
    try {
        const res = await fetch(WEB3FORMS_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({ access_key: accessKey, ...payload }),
        });
        const json = await res.json();
        return Boolean(json.success);
    } catch {
        return false;
    }
}
