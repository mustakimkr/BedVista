import { NextResponse } from "next/server";
import { Resend } from "resend";

import VisitReasonEmail from "@/emails/visit-reason";

const resend =
  process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.trim().length > 0
    ? new Resend(process.env.RESEND_API_KEY)
    : null;

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const reason =
    typeof body?.reason === "string" ? body.reason.trim() : undefined;
  const contact =
    typeof body?.contact === "string" && body.contact.trim()
      ? body.contact.trim()
      : undefined;

  if (!reason || reason.length < 4) {
    return NextResponse.json(
      { error: "Tell us a few words about why you’re here." },
      { status: 400 },
    );
  }

  if (!resend || !process.env.RESEND_FROM || !process.env.RESEND_TO) {
    return NextResponse.json(
      { error: "Email isn’t configured right now. Please try again later." },
      { status: 500 },
    );
  }

  const recipients = process.env.RESEND_TO.split(",")
    .map((email) => email.trim())
    .filter(Boolean);

  if (recipients.length === 0) {
    return NextResponse.json(
      { error: "No valid recipients are configured yet." },
      { status: 500 },
    );
  }

  try {
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM,
      to: recipients,
      replyTo: contact,
      subject: "New visitor note — bedvista.com",
      react: VisitReasonEmail({ reason, contact }),
    });

    if (error) {
      throw error;
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to send visitor note", error);
    return NextResponse.json(
      { error: "We couldn’t send that just now. Please try again." },
      { status: 500 },
    );
  }
}
