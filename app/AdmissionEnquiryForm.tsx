"use client";

import { FormEvent, useState } from "react";

export default function AdmissionEnquiryForm({
  adminEmail,
  courses,
  title,
  fields,
  button,
}: {
  adminEmail: string;
  courses: string[];
  title: string;
  fields: {
    name: string;
    mobile: string;
    course: string;
  };
  button: string;
}) {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [sending, setSending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");
    setSuccess(false);
    setSending(true);

    const form = event.currentTarget;

    try {
      const data = new FormData(form);

      const payload = {
        ...Object.fromEntries(data.entries()),
        kind: "admission",
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "We could not submit your enquiry.");
      }

      form.reset();

      setSuccess(true);
      setMessage(result.message);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="enquiry-card" onSubmit={submit}>
      <div className="enquiry-title">{title}</div>

      <div className="enquiry-fields">
        <label>
          <span className="visually-hidden">{fields.name}</span>

          <input
            name="name"
            placeholder={fields.name}
            autoComplete="name"
            maxLength={120}
            required
          />
        </label>

        <label>
          <span className="visually-hidden">{fields.mobile}</span>

          <input
            name="phone"
            type="tel"
            placeholder={fields.mobile}
            autoComplete="tel"
            inputMode="tel"
            maxLength={30}
            required
          />
        </label>

        <label>
          <span className="visually-hidden">{fields.course}</span>

          <select name="course" defaultValue="" required>
            <option value="" disabled>
              {fields.course}
            </option>

            {courses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </label>

        {/* Honeypot spam protection */}
        <label className="contact-honeypot" aria-hidden="true">
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>

        <button className="pink-button" type="submit" disabled={sending}>
          {sending ? "Submitting..." : button}

          <span aria-hidden="true">↗</span>
        </button>

        {message && (
          <p
            className={`enquiry-status ${success ? "success" : "error"}`}
            role="status"
          >
            {message}

            {!success && (
              <>
                {" "}
                Contact us at <a href={`mailto:${adminEmail}`}>{adminEmail}</a>
              </>
            )}
          </p>
        )}
      </div>
    </form>
  );
}
