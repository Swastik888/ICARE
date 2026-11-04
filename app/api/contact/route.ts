import { getDb } from "@/lib/mongodb"
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_LENGTHS = {
  name: 120,
  email: 254,
  phone: 30,
  message: 5000,
  course: 80,
};

export async function POST(request: Request) {
  try {
    let payload: Record<string, unknown>;

    // Read and validate JSON.
    try {
      const data: unknown = await request.json();

      if (!data || typeof data !== "object" || Array.isArray(data)) {
        return NextResponse.json(
          { message: "Invalid form submission." },
          { status: 400 },
        );
      }

      payload = data as Record<string, unknown>;
    } catch {
      return NextResponse.json(
        { message: "Please submit a valid form." },
        { status: 400 },
      );
    }

    // Honeypot spam protection.
    if (typeof payload.website === "string" && payload.website.trim()) {
      return NextResponse.json({
        message: "Your submission has been received.",
      });
    }

    const kind = payload.kind;

    if (kind !== "contact" && kind !== "admission") {
      return NextResponse.json(
        { message: "Invalid enquiry type." },
        { status: 400 },
      );
    }

    const name = typeof payload.name === "string" ? payload.name.trim() : "";

    const email = typeof payload.email === "string" ? payload.email.trim() : "";

    const phone = typeof payload.phone === "string" ? payload.phone.trim() : "";

    const message =
      typeof payload.message === "string" ? payload.message.trim() : "";

    const course =
      typeof payload.course === "string" ? payload.course.trim() : "";

    const admission = kind === "admission";

    // Required fields.
    if (
      !name ||
      !phone ||
      name.length > MAX_LENGTHS.name ||
      phone.length > MAX_LENGTHS.phone
    ) {
      return NextResponse.json(
        { message: "Please enter a valid name and phone number." },
        { status: 400 },
      );
    }

    // Contact form validation.
    if (!admission) {
      if (!email || !message) {
        return NextResponse.json(
          { message: "Please provide your email and message." },
          { status: 400 },
        );
      }

      if (message.length > MAX_LENGTHS.message) {
        return NextResponse.json(
          { message: "Your message is too long." },
          { status: 400 },
        );
      }
    }

    // Email validation.
    if (
      email.length > MAX_LENGTHS.email ||
      (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    ) {
      return NextResponse.json(
        { message: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    // Admission validation.
    if (admission && (!course || course.length > MAX_LENGTHS.course)) {
      return NextResponse.json(
        { message: "Please select a valid course." },
        { status: 400 },
      );
    }

    // Connect to MongoDB.
    const db = await getDb();

    // Prepare enquiry document.
    const enquiry = {
      kind,
      name,
      email: email || null,
      phone,
      message: message || null,
      course: course || null,
      status: "new",
      source: "website",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Save enquiry permanently.
    const result = await db.collection("enquiries").insertOne(enquiry);

    console.log("Enquiry saved:", result.insertedId.toString());

    return NextResponse.json(
      {
        success: true,
        message: admission
          ? "Your admission enquiry has been received. Thank you!"
          : "Your message has been received. Thank you for contacting us.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Enquiry submission error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 },
    );
  }
}
