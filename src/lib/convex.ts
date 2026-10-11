const convexUrl = import.meta.env.PUBLIC_CONVEX_URL as string | undefined;

export const convexCall = async (kind: "mutation" | "query", path: string, args: unknown) => convexUrl ? fetch(`${convexUrl}/api/${kind}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ path, args, format: "json" }) }).then((response) => response.json()) : null;
