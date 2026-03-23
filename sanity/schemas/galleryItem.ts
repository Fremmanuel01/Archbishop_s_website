import { defineType, defineField } from "sanity";

export const galleryItem = defineType({
  name: "galleryItem",
  title: "Gallery Item",
  type: "document",
  fields: [
    defineField({ name: "image",      title: "Image",            type: "image", options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: "captionEn",  title: "Caption (English)", type: "string" }),
    defineField({ name: "captionIg",  title: "Caption (Igbo)",    type: "string" }),
    defineField({ name: "captionIt",  title: "Caption (Italian)", type: "string" }),
    defineField({ name: "takenAt",    title: "Date Taken",        type: "date" }),
    defineField({
      name: "album",
      title: "Album",
      type: "string",
      options: {
        list: ["Ordinations", "Pastoral Visits", "Events", "Official", "Personal"],
      },
    }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  orderings: [
    { title: "Date (Newest)", name: "dateDesc", by: [{ field: "takenAt", direction: "desc" }] },
    { title: "Order",         name: "order",    by: [{ field: "order",   direction: "asc"  }] },
  ],
  preview: {
    select: { title: "captionEn", subtitle: "album", media: "image" },
    prepare: ({ title, subtitle, media }) => ({ title: title || "Untitled", subtitle, media }),
  },
});
