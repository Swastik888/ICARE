import { homeContent } from "@/content/home";

const MAX_LENGTHS = { name: 120, email: 254, phone: 30, message: 5000 };

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json() as Record<string, unknown>;
  } catch {
    return Response.json({ message: "Please submit a valid contact form." }, { status: 400 });
  }

  // Quietly accept honeypot submissions so simple bots do not retry.
  if (typeof payload.website === "string" && payload.website.trim()) {
    return Response.json({ message: "Your message has been sent." });
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const phone = typeof payload.phone === "string" ? payload.phone.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  if (!name || !email || !phone || !message || name.length > MAX_LENGTHS.name || email.length > MAX_LENGTHS.email || phone.length > MAX_LENGTHS.phone || message.length > MAX_LENGTHS.message) {
    return Response.json({ message: "Please complete each field and keep the message under 5,000 characters." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ message: "Please enter a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) {
    return Response.json({ message: "Online message delivery is not configured yet. Please email us directly at " + homeContent.utility.email + "." }, { status: 503 });
  }

  try {
    const delivery = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [homeContent.utility.email],
        reply_to: email,
        subject: `Website contact message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
      }),
    });

    if (!delivery.ok) {
      console.error("Contact email delivery failed with status", delivery.status);
      return Response.json({ message: "We could not deliver your message right now. Please email us directly at " + homeContent.utility.email + "." }, { status: 502 });
    }
  } catch (error) {
    console.error("Contact email service is unavailable", error);
    return Response.json({ message: "We could not deliver your message right now. Please email us directly at " + homeContent.utility.email + "." }, { status: 502 });
  }
  return Response.json({ message: "Your message has been sent. Thank you for contacting us." });
}
