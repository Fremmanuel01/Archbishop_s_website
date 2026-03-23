import { defineType, defineField } from "sanity";

export const appointment = defineType({
  name: "appointment",
  title: "Appointment Settings",
  type: "document",
  fields: [
    defineField({
      name: "type",
      title: "Appointment Type",
      type: "string",
      options: {
        list: [
          { title: "Laity (Tuesdays)",          value: "laity"  },
          { title: "Clergy & Religious (Wednesdays)", value: "clergy" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "instructionsEn", title: "Instructions (English)", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "instructionsIg", title: "Instructions (Igbo)",    type: "array", of: [{ type: "block" }] }),
    defineField({ name: "instructionsIt", title: "Instructions (Italian)", type: "array", of: [{ type: "block" }] }),
    defineField({
      name: "availableSlots",
      title: "Available Date Slots",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "date",     title: "Date",            type: "date" },
          { name: "maxSlots", title: "Max Bookings",    type: "number" },
          { name: "open",     title: "Open for Booking", type: "boolean" },
        ],
        preview: { select: { title: "date", subtitle: "maxSlots" } },
      }],
    }),
  ],
  preview: {
    select: { title: "type" },
    prepare: ({ title }) => ({ title: title === "laity" ? "Laity Appointments (Tuesdays)" : "Clergy Appointments (Wednesdays)" }),
  },
});
