// PUBLIC_DISABLE_SHARE=true turns sharing off entirely: no share section, no Convex calls.
export const shareEnabled = import.meta.env.PUBLIC_DISABLE_SHARE !== "true";
const convexUrl = shareEnabled ? (import.meta.env.PUBLIC_CONVEX_URL as string | undefined) : undefined;

export const convexCall = async (kind: "mutation" | "query", path: string, args: unknown) => convexUrl ? fetch(`${convexUrl}/api/${kind}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ path, args, format: "json" }) }).then((response) => response.json()) : null;
