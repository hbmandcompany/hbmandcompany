import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Collects voting-protocol interest signups. Optional email delivery via Resend:
 * - RESEND_API_KEY
 * - VOTING_PROTOCOL_FROM_EMAIL (verified sender in Resend)
 * - VOTING_PROTOCOL_NOTIFY_EMAIL (defaults to hbmandcompany@gmail.com)
 */
export async function POST(req: Request) {
  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  const from = process.env.VOTING_PROTOCOL_FROM_EMAIL;
  const notifyTo = process.env.VOTING_PROTOCOL_NOTIFY_EMAIL ?? "hbmandcompany@gmail.com";

  if (key && from) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [notifyTo],
        subject: "Voting protocol — new signup",
        text: `New voting protocol signup\n\nEmail: ${email}\nTime (UTC): ${new Date().toISOString()}`,
        reply_to: email,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("Resend voting-protocol-signup failed", res.status, detail);
      return NextResponse.json({ error: "Unable to send at this time" }, { status: 502 });
    }
  } else if (process.env.NODE_ENV === "development") {
    console.info("[voting-protocol-signup]", email);
  }

  return NextResponse.json({ ok: true });
}
