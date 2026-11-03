"use client";

import { FormEvent, useState } from "react";

export default function AdmissionEnquiryForm({ adminEmail, courses, title, fields, button }: {
  adminEmail: string;
  courses: string[];
  title: string;
  fields: { name: string; mobile: string; course: string };
  button: string;
}) {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [emailDraft, setEmailDraft] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setSending(true);
    const form = event.currentTarget;
    const data = new FormData(form);
    const draftBody = `Admission enquiry\n\nName: ${data.get("name")}\nPhone: ${data.get("phone")}\nCourse: ${data.get("course")}`;
    const draftHref = `mailto:${adminEmail}?subject=${encodeURIComponent(`Admission enquiry from ${data.get("name")}`)}&body=${encodeURIComponent(draftBody)}`;
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(new FormData(form).entries()), kind: "admission" }),
      });
      const result = await response.json() as { message?: string };
      if (!response.ok) {
        setEmailDraft(draftHref);
        setMessage(result.message || "We could not send your enquiry. Please contact us directly.");
        return;
      }
      form.reset();
      setEmailDraft("");
      setMessage(result.message || "Your enquiry has been sent.");
    } catch (error) {
      setEmailDraft(draftHref);
      setMessage(error instanceof Error ? error.message : `Please contact ${adminEmail} directly.`);
    } finally {
      setSending(false);
    }
  }

  return <form className="enquiry-card" onSubmit={submit}>
    <div className="enquiry-title">{title}</div>
    <div className="enquiry-fields">
      <label><span className="visually-hidden">{fields.name}</span><input name="name" placeholder={fields.name} autoComplete="name" maxLength={120} required /></label>
      <label><span className="visually-hidden">{fields.mobile}</span><input name="phone" type="tel" placeholder={fields.mobile} autoComplete="tel" inputMode="tel" maxLength={30} required /></label>
      <label><span className="visually-hidden">{fields.course}</span><select name="course" defaultValue="" required><option value="" disabled>{fields.course}</option>{courses.map((course) => <option key={course}>{course}</option>)}</select></label>
      <label className="contact-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <button className="pink-button" type="submit" disabled={sending}>{sending ? "Sending..." : button}<span aria-hidden="true">↗</span></button>
      {message && <p className="enquiry-status" role="status">{message}{emailDraft && <> <a href={emailDraft}>Open a prefilled email to {adminEmail}</a></>}</p>}
    </div>
  </form>;
}
