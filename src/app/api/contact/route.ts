import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  sendEmail,
  isEmailConfigured,
  CONTACT_INBOX,
  escapeHtml,
} from "@/lib/email";

const schema = z.object({
  name:    z.string().min(2),
  email:   z.string().email(),
  message: z.string().min(10),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  if (!isEmailConfigured()) {
    return NextResponse.json(
      { error: "Email service is not configured" },
      { status: 503 }
    );
  }

  const { name, email, message } = parsed.data;
  const safeName    = escapeHtml(name);
  const safeEmail   = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  try {
    await sendEmail({
      to: CONTACT_INBOX,
      replyTo: email,
      subject: `New contact message from ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;color:#0a0f1e;max-width:560px">
          <h2 style="color:#b8922f;font-family:Georgia,serif;">New contact message</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Message:</strong></p>
          <div style="border-left:3px solid #b8922f;padding:8px 14px;background:#faf8f5">
            ${safeMessage}
          </div>
        </div>
      `,
    });

    await sendEmail({
      to: email,
      subject: "We received your message",
      html: `
        <div style="font-family:Arial,sans-serif;color:#0a0f1e;max-width:560px">
          <h2 style="color:#b8922f;font-family:Georgia,serif;">Thank you, ${safeName}</h2>
          <p>Your message has been received by the Office of the Archbishop of Onitsha.</p>
          <p>We will respond as soon as possible.</p>
          <p style="margin-top:24px;color:#5a5a5a;font-size:12px">
            Archdiocese of Onitsha &middot; Most Rev. Valerian Maduka Okeke
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 502 }
    );
  }
}
