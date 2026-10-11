import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  profiles: defineTable({
    slug: v.string(),
    geminiUserId: v.string(),
    tempChat: v.optional(v.boolean()),
    disabledDefaults: v.optional(v.array(v.string())),
    profiles: v.array(v.object({
      id: v.string(),
      name: v.string(),
      keybind: v.optional(v.string()),
      url: v.string(),
      customSettings: v.array(v.object({ name: v.string(), read: v.union(v.literal("string"), v.literal("boolean")), value: v.string() })),
    })),
  }).index("by_slug", ["slug"]),
});
