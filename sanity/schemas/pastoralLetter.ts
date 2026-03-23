import { defineType, defineField } from "sanity";

export const pastoralLetter = defineType({
  name: "pastoralLetter",
  title: "Pastoral Letter",
  type: "document",
  fields: [
    defineField({ name: "titleEn", title: "Title (English)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "titleIg", title: "Title (Igbo)",    type: "string" }),
    defineField({ name: "titleIt", title: "Title (Italian)", type: "string" }),
    defineField({ name: "year", title: "Year", type: "number", validation: (r) => r.required() }),
    defineField({ name: "publishedAt", title: "Published At", type: "date" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "titleEn" } }),
    defineField({ name: "descriptionEn", title: "Description (English)", type: "text" }),
    defineField({ name: "descriptionIg", title: "Description (Igbo)",    type: "text" }),
    defineField({ name: "descriptionIt", title: "Description (Italian)", type: "text" }),
    defineField({ name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "pdfEn", title: "PDF (English)", type: "file", options: { accept: "application/pdf" } }),
    defineField({ name: "pdfIg", title: "PDF (Igbo)",    type: "file", options: { accept: "application/pdf" } }),
    defineField({ name: "pdfIt", title: "PDF (Italian)", type: "file", options: { accept: "application/pdf" } }),
  ],
  orderings: [{ title: "Year (Newest)", name: "yearDesc", by: [{ field: "year", direction: "desc" }] }],
  preview: {
    select: { title: "titleEn", subtitle: "year" },
    prepare: ({ title, subtitle }) => ({ title: `${subtitle} — ${title}` }),
  },
});
