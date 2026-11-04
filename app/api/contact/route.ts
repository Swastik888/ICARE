import { homeContent } from "@/content/home";

const MAX_LENGTHS = {
  name: 120,
  email: 254,
  phone: 30,
  message: 5000,
  course: 80,
};

export async function POST(request: Request) {
  let payload: Record<string, unknown>;

  try {
    const data: unknown = await request.json();

    if (!data || typeof data !== "object" || Array.isArray(data)) {
      return Response.json(
        { message: "Invalid form submission." },
        { status: 400 },
      );
    }

    payload = data as Record<string, unknown>;
  } catch {
    return Response.json(
      { message: "Please submit a valid contact form." },
      { status: 400 },
    );
  }

  // Honeypot: quietly accept bot submissions.
  if (typeof payload.website === "string" && payload.website.trim()) {
    return Response.json({
      message: "Your message has been sent.",
    });
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";

  const email = typeof payload.email === "string" ? payload.email.trim() : "";

  const phone = typeof payload.phone === "string" ? payload.phone.trim() : "";

  const message =
    typeof payload.message === "string" ? payload.message.trim() : "";

  const course =
    typeof payload.course === "string" ? payload.course.trim() : "";

  const admission = payload.kind === "admission";

  if (
    !name ||
    !phone ||
    name.length > MAX_LENGTHS.name ||
    phone.length > MAX_LENGTHS.phone
  ) {
    return Response.json(
      { message: "Please enter your name and phone number." },
      { status: 400 },
    );
  }

  if (!admission && (!email || !message)) {
    return Response.json(
      { message: "Please provide your email and message." },
      { status: 400 },
    );
  }

  if (
    email.length > MAX_LENGTHS.email ||
    (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
  ) {
    return Response.json(
      { message: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  if (!admission && message.length > MAX_LENGTHS.message) {
    return Response.json(
      { message: "Your message is too long." },
      { status: 400 },
    );
  }

  if (admission && (!course || course.length > MAX_LENGTHS.course)) {
    return Response.json(
      { message: "Please select a course." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !from) {
    console.error("Missing Resend environment variables.");

    return Response.json(
      { message: "Email service is not configured." },
      { status: 503 },
    );
  }

  try {
    const emailText = admission
      ? `Admission enquiry

Name: ${name}
Phone: ${phone}
Course: ${course}`
      : `Contact message

Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}`;

    const body: Record<string, unknown> = {
      from,
      to: [homeContent.utility.email],
      subject: admission
        ? `Admission enquiry from ${name}`
        : `Website contact message from ${name}`,
      text: emailText,
    };

    if (email) {
      body.reply_to = email;
    }

    const delivery = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!delivery.ok) {
      const errorDetails = await delivery.text();

      console.error("Resend delivery error:", errorDetails);

      return Response.json(
        { message: "Email delivery failed. Please try again later." },
        { status: 502 },
      );
    }

    const result = await delivery.json();

    console.log("Email sent successfully:", result.id);

    return Response.json({
      message: admission
        ? "Your admission enquiry has been sent. Thank you."
        : "Your message has been sent. Thank you for contacting us.",
    });
  } catch (error) {
    console.error("Email service error:", error);

    return Response.json(
      { message: "Something went wrong. Please try again later." },
      { status: 502 },
    );
  }
}
