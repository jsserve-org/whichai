export type CustomSetting = { name: string; read: "boolean" | "string"; value: string };
export type Profile = { id: string; name: string; url: string; customSettings: CustomSetting[] };

export const resolveUrl = (profile: Profile) => profile.url.replace(/\[:([^\]]+)\]/g, (_, name: string) => profile.customSettings.find((setting) => setting.name === name)?.value ?? "");

export const displayUrl = (url: string) => {
    try {
        const { host, pathname } = new URL(url);
        return (host + pathname).replace(/\/$/, "");
    } catch {
        return url;
    }
};

export const createRow = (profile: Profile) => {
    const url = resolveUrl(profile);
    const item = document.createElement("li");
    const row = document.createElement("a");
    row.className = "row";
    row.href = url;
    for (const [tag, className, text] of [["kbd", "row-key", ""], ["span", "row-name", profile.name], ["span", "row-url", displayUrl(url)]]) {
        const el = document.createElement(tag);
        el.className = className;
        el.textContent = text;
        row.append(el);
    }
    item.dataset.custom = profile.id;
    item.append(row);
    return item;
};

// Rows 1–9 open with the matching digit key; the count also sizes the type so every row fits.
export const numberRows = (root: HTMLElement) => {
    const rows = root.querySelectorAll<HTMLAnchorElement>("li:not([hidden]) > .row");
    rows.forEach((row, index) => {
        const key = row.querySelector(".row-key");
        if (key) key.textContent = index < 9 ? String(index + 1) : "";
    });
    document.documentElement.style.setProperty("--n", String(Math.max(rows.length, 1)));
};

export const bindDigitKeys = (root: HTMLElement) => {
    document.addEventListener("keydown", (event) => {
        if (event.metaKey || event.ctrlKey || event.altKey || !/^[1-9]$/.test(event.key)) return;
        if (document.querySelector("dialog[open]") || (event.target as HTMLElement).closest("input, select, textarea")) return;
        const row = root.querySelectorAll<HTMLAnchorElement>("li:not([hidden]) > .row")[Number(event.key) - 1];
        if (!row) return;
        row.focus();
        row.click();
    });
};
