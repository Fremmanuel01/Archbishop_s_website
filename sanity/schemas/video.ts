import { defineType, defineField } from "sanity";

export const video = defineType({
  name: "video",
  title: "Video",
  type: "document",
  fields: [
    defineField({ name: "titleEn",       title: "Title (English)",      type: "string", validation: (r) => r.required() }),
    defineField({ name: "titleIg",       title: "Title (Igbo)",         type: "string" }),
    defineField({ name: "titleIt",       title: "Title (Italian)",      type: "string" }),
    defineField({ name: "publishedAt",   title: "Published At",         type: "datetime" }),
    defineField({ name: "thumbnail",     title: "Thumbnail Image",      type: "image", options: { hotspot: true } }),
    defineField({ name: "videoUrl",      title: "Video URL (YouTube / Vimeo)", type: "url" }),
    defineField({ name: "videoFile",     title: "Video File Upload",    type: "file", description: "Use if no external URL" }),
    defineField({ name: "descriptionEn", title: "Description (English)", type: "text" }),
    defineField({ name: "descriptionIg", title: "Description (Igbo)",   type: "text" }),
    defineField({ name: "descriptionIt", title: "Description (Italian)", type: "text" }),
  ],
  orderings: [{ title: "Date (Newest)", name: "dateDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: {
    select: { title: "titleEn", subtitle: "publishedAt", media: "thumbnail" },
  },
});
