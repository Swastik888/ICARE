import { homeContent } from "@/content/home";

const MAX_LENGTHS = { name: 120, email: 254, phone: 30, message: 5000, course: 80 };

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
  const course = typeof payload.course === "string" ? payload.course.trim() : "";
  const admission = payload.kind === "admission";

  if (!name || !phone || name.length > MAX_LENGTHS.name || phone.length > MAX_LENGTHS.phone) {
    return Response.json({ message: "Please enter your name and a valid phone number." }, { status: 400 });
  }
  if (!admission && (!email || !message || message.length > MAX_LENGTHS.message)) {
    return Response.json({ message: "Please provide your email address and message." }, { status: 400 });
  }
  if (!admission && (email.length > MAX_LENGTHS.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
    return Response.json({ message: "Please enter a valid email address." }, { status: 400 });
  }
  if (admission && (!course || course.length > MAX_LENGTHS.course)) {
    return Response.json({ message: "Please select a course for your enquiry." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) {
    return Response.json({ message: "Online message delivery is not configured yet. Please email us directly at " + homeContent.utility.email + "." }, { status: 503 });
  }

  try {
    const emailText = admission
      ? `Admission enquiry\n\nName: ${name}\nPhone: ${phone}\nCourse: ${course}`
      : `Contact message\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`;
    const body: Record<string, unknown> = {
      from,
      to: [homeContent.utility.email],
      subject: admission ? `Admission enquiry from ${name}` : `Website contact message from ${name}`,
      text: emailText,
    };
    if (email) body.reply_to = email;

    const delivery = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!delivery.ok) {
      console.error("Contact email delivery failed with status", delivery.status);
      return Response.json({ message: "We could not deliver your message right now. Please email us directly at " + homeContent.utility.email + "." }, { status: 502 });
    }
  } catch (error) {
    console.error("Contact email service is unavailable", error);
    return Response.json({ message: "We could not deliver your message right now. Please email us directly at " + homeContent.utility.email + "." }, { status: 502 });
  }
  return Response.json({ message: admission ? "Your admission enquiry has been sent. Thank you." : "Your message has been sent. Thank you for contacting us." });
}
