// Shared by the inline first-paint script and React after hydration.
// Keep this browser module self-contained so the static HTML needs no imports.
const petersburgDay = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Moscow",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
});

export function getEventToday(now = new Date()) {
    return petersburgDay.format(now);
}

/**
 * @template {{ start: string }} T
 * @param {T[]} upcoming
 * @param {string | null} requested
 * @returns {T | undefined}
 */
export function selectEventOccurrence(upcoming, requested) {
    return (
        upcoming.find(
            ({ start }) =>
                requested === start || requested === start.slice(0, 10),
        ) ?? upcoming[0]
    );
}

/** @param {HTMLElement} root */
export function updateEventDateDisplay(root) {
    const today = getEventToday();
    const requested = new URLSearchParams(location.search).get("date");
    const upcoming = [];
    for (const item of root.querySelectorAll("details li")) {
        const time = item.querySelector("time");
        const start = time.dateTime;
        item.hidden = start < today;
        if (!item.hidden) upcoming.push({ item, time, start });
    }
    const selected = selectEventOccurrence(upcoming, requested);
    root.querySelector("[data-schedule-available]").hidden = !selected;
    root.querySelector("[data-schedule-archive]").hidden = Boolean(selected);
    if (!selected) return;

    selected.item.hidden = true;
    for (const item of root.querySelectorAll("[aria-live] li")) {
        item.hidden = item.querySelector("time").dateTime !== selected.start;
    }
    const others = upcoming.filter((o) => o !== selected);
    for (const [index, { item }] of others.entries()) {
        item.querySelector("span").hidden = index === others.length - 1;
    }
    root.querySelector("details").hidden = upcoming.length < 2;
}

/** @param {HTMLElement} root */
export function initializeEventDateDisplay(root) {
    updateEventDateDisplay(root);
    // A history traversal before Next mounts must hydrate the restored URL.
    if (!root.hasAttribute("data-hydrated")) {
        const restore = () => location.reload();
        window.addEventListener("popstate", restore, { once: true });
        root.addEventListener(
            "schedule-ready",
            () => window.removeEventListener("popstate", restore),
            { once: true },
        );
    }
}
