import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  sendEmail,
  isEmailConfigured,
  APPOINTMENTS_INBOX,
  escapeHtml,
} from "@/lib/email";

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
    return NextResponse.json(
      { error: "Invalid data", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  if (!isEmailConfigured()) {
    return NextResponse.json(
      { error: "Email service is not configured" },
      { status: 503 }
    );
  }

  const data = parsed.data;
  const typeLabel = data.type === "clergy" ? "Priests & Religious" : "Lay Faithful";
  const safe = {
    name:    escapeHtml(data.name),
    phone:   escapeHtml(data.phone),
    email:   data.email ? escapeHtml(data.email) : "—",
    purpose: escapeHtml(data.purpose).replace(/\n/g, "<br />"),
    date:    escapeHtml(data.date),
  };

  try {
    await sendEmail({
      to: APPOINTMENTS_INBOX,
      replyTo: data.email || undefined,
      subject: `Appointment request (${typeLabel}) — ${data.date}`,
      html: `
        <div style="font-family:Arial,sans-serif;color:#0a0f1e;max-width:560px">
          <h2 style="color:#b8922f;font-family:Georgia,serif;">New ${typeLabel} appointment request</h2>
          <table style="border-collapse:collapse;width:100%;font-size:14px">
            <tr><td style="padding:6px 0;width:120px"><strong>Name</strong></td><td>${safe.name}</td></tr>
            <tr><td style="padding:6px 0"><strong>Phone</strong></td><td>${safe.phone}</td></tr>
            <tr><td style="padding:6px 0"><strong>Email</strong></td><td>${safe.email}</td></tr>
            <tr><td style="padding:6px 0"><strong>Date</strong></td><td>${safe.date}</td></tr>
          </table>
          <p style="margin-top:16px"><strong>Purpose:</strong></p>
          <div style="border-left:3px solid #b8922f;padding:8px 14px;background:#faf8f5">
            ${safe.purpose}
          </div>
        </div>
      `,
    });

    if (data.email) {
      await sendEmail({
        to: data.email,
        subject: "Appointment request received",
        html: `
          <div style="font-family:Arial,sans-serif;color:#0a0f1e;max-width:560px">
            <h2 style="color:#b8922f;font-family:Georgia,serif;">Dear ${safe.name},</h2>
            <p>Your appointment request for <strong>${safe.date}</strong> has been received by the Office of the Archbishop of Onitsha.</p>
            <p>Available slots are honoured on a first come, first served basis. You will be contacted to confirm.</p>
            <p style="margin-top:24px;color:#5a5a5a;font-size:12px">
              Archdiocese of Onitsha &middot; Most Rev. Valerian Maduka Okeke
            </p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to submit appointment" },
      { status: 502 }
    );
  }
}
