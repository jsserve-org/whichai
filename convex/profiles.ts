import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const profile = v.object({ id: v.string(), name: v.string(), keybind: v.optional(v.string()), url: v.string(), customSettings: v.array(v.object({ name: v.string(), read: v.union(v.literal("string"), v.literal("boolean")), value: v.string() })) });

export const create = mutation({
  args: { slug: v.string(), geminiUserId: v.string(), tempChat: v.optional(v.boolean()), disabledDefaults: v.optional(v.array(v.string())), profiles: v.array(profile) },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("profiles").withIndex("by_slug", (q) => q.eq("slug", args.slug)).unique();
    if (existing) return existing._id;
    return ctx.db.insert("profiles", args);
  },
});

export const get = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => ctx.db.query("profiles").withIndex("by_slug", (q) => q.eq("slug", args.slug)).unique(),
});
