import { defineType, defineField } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "heroHeading",
      title: "Hero Heading",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "string" },
        { name: "ig", title: "Igbo",    type: "string" },
        { name: "it", title: "Italian", type: "string" },
      ],
    }),
    defineField({
      name: "heroSubheading",
      title: "Hero Sub-heading",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "string" },
        { name: "ig", title: "Igbo",    type: "string" },
        { name: "it", title: "Italian", type: "string" },
      ],
    }),
    defineField({ name: "heroImage", title: "Hero Background Image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "heroVideoUrl",
      title: "Hero Background Video URL",
      type: "url",
      description: "Direct MP4/WebM URL (e.g. from Cloudinary or your server). If set, this plays as a looping background video instead of the image.",
    }),
    defineField({
      name: "featuredQuotes",
      title: "Featured Quotes (for carousel)",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "quoteEn", title: "Quote (English)", type: "text" },
          { name: "quoteIg", title: "Quote (Igbo)",    type: "text" },
          { name: "quoteIt", title: "Quote (Italian)", type: "text" },
          { name: "source",  title: "Source / Scripture", type: "string" },
        ],
      }],
    }),
    defineField({
      name: "featuredTeachings",
      title: "Featured Teachings (max 3)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "teaching" }] }],
      validation: (r) => r.max(3),
    }),
    defineField({
      name: "featuredGallery",
      title: "Featured Gallery Images (max 8)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "galleryItem" }] }],
      validation: (r) => r.max(8),
    }),
  ],
  preview: { prepare: () => ({ title: "Home Page" }) },
});
