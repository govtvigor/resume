import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { name, email, message } = parsed.data;

  if (process.env.NODE_ENV === "development") {
    console.info("[contact]", { name, email, messageLength: message.length });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `Portfolio contact from ${name} <${email}>:\n${message}`,
        }),
      });
    } catch {
      return NextResponse.json(
        { error: "Could not deliver message. Try again later." },
        { status: 502 }
      );
    }
  }

  return NextResponse.json({ ok: true });
}
