import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

export const FROM_ADDRESS =
  process.env.EMAIL_FROM ?? "Archbishop's Office <noreply@archbishopvalokeke.org>";

export const CONTACT_INBOX =
  process.env.CONTACT_INBOX ?? "info@archbishopvalokeke.org";

export const APPOINTMENTS_INBOX =
  process.env.APPOINTMENTS_INBOX ?? CONTACT_INBOX;

const resend = apiKey ? new Resend(apiKey) : null;

interface SendArgs {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail({ to, subject, html, replyTo }: SendArgs) {
  if (!resend) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  return resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject,
    html,
    replyTo,
  });
}

export const isEmailConfigured = () => Boolean(resend);

export function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
