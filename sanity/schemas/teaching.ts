import { defineType, defineField } from "sanity";

export const teaching = defineType({
  name: "teaching",
  title: "Teaching",
  type: "document",
  fields: [
    defineField({ name: "titleEn", title: "Title (English)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "titleIg", title: "Title (Igbo)",    type: "string" }),
    defineField({ name: "titleIt", title: "Title (Italian)", type: "string" }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Reflections & Homilies", value: "homily" },
          { title: "Addresses",              value: "address" },
          { title: "Messages",               value: "message" },
          { title: "Interviews",             value: "interview" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "titleEn" } }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text" }),
    defineField({ name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "bodyEn", title: "Body (English)", type: "array", of: [{ type: "block" }, { type: "image" }] }),
    defineField({ name: "bodyIg", title: "Body (Igbo)",    type: "array", of: [{ type: "block" }, { type: "image" }] }),
    defineField({ name: "bodyIt", title: "Body (Italian)", type: "array", of: [{ type: "block" }, { type: "image" }] }),
    defineField({ name: "pdfEn", title: "PDF (English)", type: "file", options: { accept: "application/pdf" } }),
  ],
  orderings: [{ title: "Date (Newest)", name: "dateDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: {
    select: { title: "titleEn", subtitle: "category", media: "coverImage" },
  },
});
