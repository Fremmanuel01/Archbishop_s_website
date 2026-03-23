import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "siteName", title: "Site Name", type: "string" }),
    defineField({ name: "logo", title: "Logo", type: "image" }),
    defineField({ name: "favicon", title: "Favicon", type: "image" }),
    defineField({
      name: "diaryWidgetUrl",
      title: "Pastoral Diary Widget URL",
      type: "url",
      description: "URL of the WordPress page hosting the pastoral diary widget (for iframe embed)",
    }),
    defineField({
      name: "livestreamUrl",
      title: "Live Stream URL",
      type: "url",
      description: "YouTube or Facebook Live embed URL (leave blank to hide the section)",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "platform", title: "Platform", type: "string", options: { list: ["facebook", "twitter", "youtube", "instagram"] } },
          { name: "url", title: "URL", type: "url" },
          { name: "handle", title: "Handle / Username", type: "string" },
        ],
      }],
    }),
    defineField({
      name: "contactInfo",
      title: "Contact Information",
      type: "object",
      fields: [
        { name: "address",     title: "Physical Address",  type: "text" },
        { name: "phone1",      title: "Phone 1",           type: "string" },
        { name: "phone2",      title: "Phone 2",           type: "string" },
        { name: "email1",      title: "Primary Email",     type: "string" },
        { name: "email2",      title: "Secondary Email",   type: "string" },
        { name: "mapEmbedUrl", title: "Google Maps Embed URL", type: "url" },
      ],
    }),
    defineField({
      name: "staffContacts",
      title: "Staff Contacts",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "name",  title: "Name",  type: "string" },
          { name: "role",  title: "Role",  type: "string" },
          { name: "phone", title: "Phone", type: "string" },
          { name: "email", title: "Email", type: "string" },
        ],
      }],
    }),
  ],
  preview: { select: { title: "siteName" } },
});
