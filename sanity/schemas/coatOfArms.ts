import { defineType, defineField } from "sanity";

export const coatOfArms = defineType({
  name: "coatOfArms",
  title: "Coat of Arms",
  type: "document",
  fields: [
    defineField({ name: "image", title: "Coat of Arms Image", type: "image", options: { hotspot: false }, validation: (r) => r.required() }),
    defineField({
      name: "motto",
      title: "Motto",
      type: "object",
      fields: [
        { name: "latin",  title: "Latin",   type: "string" },
        { name: "en",     title: "English Translation", type: "string" },
        { name: "ig",     title: "Igbo Translation",    type: "string" },
        { name: "it",     title: "Italian Translation", type: "string" },
      ],
    }),
    defineField({
      name: "sections",
      title: "Explanation Sections",
      description: "Each section focuses on a different part of the coat of arms",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "order",        title: "Order",              type: "number" },
          { name: "headingEn",    title: "Heading (English)",  type: "string" },
          { name: "headingIg",    title: "Heading (Igbo)",     type: "string" },
          { name: "headingIt",    title: "Heading (Italian)",  type: "string" },
          { name: "bodyEn",       title: "Body (English)",     type: "array", of: [{ type: "block" }] },
          { name: "bodyIg",       title: "Body (Igbo)",        type: "array", of: [{ type: "block" }] },
          { name: "bodyIt",       title: "Body (Italian)",     type: "array", of: [{ type: "block" }] },
          { name: "focusX",       title: "Focus X (0–1)",      type: "number", description: "Horizontal focus point for zoom animation" },
          { name: "focusY",       title: "Focus Y (0–1)",      type: "number", description: "Vertical focus point for zoom animation" },
        ],
        preview: { select: { title: "headingEn", subtitle: "order" } },
      }],
    }),
  ],
  preview: { prepare: () => ({ title: "Coat of Arms" }) },
});
