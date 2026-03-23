import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name:    z.string().min(2),
  phone:   z.string().min(7),
  email:   z.string().email().optional().or(z.literal("")),
  purpose: z.string().min(5),
  date:    z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  type:    z.enum(["laity", "clergy"]),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data", issues: parsed.error.issues }, { status: 400 });
  }

  const data = parsed.data;
  console.log("[Appointment Request]", data);

  // TODO: Integrate email provider (Resend, Nodemailer, etc.) to send confirmation
  // Example with Resend:
  // await resend.emails.send({
  //   from: 'noreply@archbishopvalokeke.org',
  //   to: data.email,
  //   subject: 'Appointment Request Received',
  //   html: `<p>Dear ${data.name}, your appointment request for ${data.date} has been received.</p>`
  // });

  return NextResponse.json({ success: true });
}
