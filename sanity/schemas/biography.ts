import { defineType, defineField } from "sanity";

export const biography = defineType({
  name: "biography",
  title: "Biography",
  type: "document",
  fields: [
    defineField({ name: "portraitImage", title: "Portrait Image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "sections",
      title: "Biography Sections",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "headingEn", title: "Heading (English)", type: "string" },
          { name: "headingIg", title: "Heading (Igbo)",    type: "string" },
          { name: "headingIt", title: "Heading (Italian)", type: "string" },
          { name: "bodyEn",    title: "Body (English)",    type: "array", of: [{ type: "block" }] },
          { name: "bodyIg",    title: "Body (Igbo)",       type: "array", of: [{ type: "block" }] },
          { name: "bodyIt",    title: "Body (Italian)",    type: "array", of: [{ type: "block" }] },
          { name: "image",     title: "Section Image",     type: "image", options: { hotspot: true } },
        ],
      }],
    }),
    defineField({
      name: "timeline",
      title: "Timeline Events",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "year",          title: "Year",                   type: "number" },
          { name: "labelEn",       title: "Label (English)",        type: "string" },
          { name: "labelIg",       title: "Label (Igbo)",           type: "string" },
          { name: "labelIt",       title: "Label (Italian)",        type: "string" },
          { name: "descriptionEn", title: "Description (English)",  type: "text" },
          { name: "descriptionIg", title: "Description (Igbo)",     type: "text" },
          { name: "descriptionIt", title: "Description (Italian)",  type: "text" },
          { name: "highlight",     title: "Gold Highlight",         type: "boolean" },
        ],
        preview: { select: { title: "labelEn", subtitle: "year" } },
      }],
    }),
  ],
  preview: { prepare: () => ({ title: "Biography" }) },
});
