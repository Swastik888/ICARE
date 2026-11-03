"use client";

import { FormEvent, useState } from "react";

type FormStatus = { kind: "success" | "error"; message: string } | null;

export default function ContactForm({ adminEmail }: { adminEmail: string }) {
  const [status, setStatus] = useState<FormStatus>(null);
  const [sending, setSending] = useState(false);
  const [emailDraft, setEmailDraft] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setSending(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    const draftBody = `Name: ${payload.name}\nEmail: ${payload.email}\nPhone: ${payload.phone}\n\nMessage:\n${payload.message}`;
    const draftHref = `mailto:${adminEmail}?subject=${encodeURIComponent(`Website contact message from ${payload.name}`)}&body=${encodeURIComponent(draftBody)}`;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        setEmailDraft(draftHref);
        setStatus({ kind: "error", message: result.message ?? "Your message could not be sent. Please email us directly." });
        return;
      }

      form.reset();
      setEmailDraft("");
      setStatus({ kind: "success", message: result.message ?? "Your message has been sent." });
    } catch {
      setEmailDraft(draftHref);
      setStatus({ kind: "error", message: "We could not connect to the message service. Please email us directly." });
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="contact-form-card" onSubmit={handleSubmit}>
      <h2>Leave Us Message</h2>
      <label>
        <span className="visually-hidden">Enter name</span>
        <input name="name" placeholder="Enter name" autoComplete="name" maxLength={120} required />
      </label>
      <label>
        <span className="visually-hidden">Enter email</span>
        <input name="email" type="email" placeholder="Enter email" autoComplete="email" maxLength={254} required />
      </label>
      <label>
        <span className="visually-hidden">Enter phone</span>
        <input name="phone" type="tel" placeholder="Enter phone" autoComplete="tel" maxLength={30} required />
      </label>
      <label>
        <span className="visually-hidden">Message</span>
        <textarea name="message" placeholder="Message" rows={6} maxLength={5000} required />
      </label>
      <label className="contact-honeypot" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <button className="contact-submit" type="submit" disabled={sending}>
        {sending ? "Sending..." : "Submit Message"}
        <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="M4 10h11M10 5l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      {status && (
        <p className={`contact-form-status ${status.kind}`} role="status">
          {status.message}{status.kind === "error" && <> <a href={emailDraft || `mailto:${adminEmail}`}>Open a prefilled email to {adminEmail}</a></>}
        </p>
      )}
    </form>
  );
}
