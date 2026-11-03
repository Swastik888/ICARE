import { homeContent } from "@/content/home";

function PhoneIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M6.6 3.8 9.2 3c.7-.2 1.4.2 1.6.9l1 3.2c.2.6 0 1.2-.5 1.6l-1.5 1.2a14.1 14.1 0 0 0 4.3 4.3l1.2-1.5c.4-.5 1-.7 1.6-.5l3.2 1c.7.2 1.1.9.9 1.6l-.8 2.6c-.2.6-.8 1-1.4 1C10.5 18.4 5.6 13.5 5.6 7.2c0-.6.4-1.2 1-1.4Z" fill="currentColor"/></svg>;
}

function WhatsAppIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M20 11.7a8 8 0 0 1-11.8 7L4 20l1.3-4A8 8 0 1 1 20 11.7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M9 8.3c.2-.4.4-.4.7-.4h.4c.2 0 .3.1.4.4l.7 1.7c.1.2 0 .4-.1.6l-.5.6c-.2.2-.2.4 0 .6.6 1 1.4 1.7 2.4 2.2.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.5.7c.3.1.4.3.4.5 0 .3-.2 1.1-.7 1.5-.5.4-1.1.6-1.7.5-1-.1-2.3-.7-3.7-1.9-1.2-1-2.1-2.4-2.4-3.4-.3-.9 0-1.7.4-2.2Z" fill="currentColor"/></svg>;
}

export default function FloatingContactActions() {
  const phone = homeContent.utility.phone.replace(/[^\d+]/g, "");
  const whatsapp = phone.replace(/\D/g, "");

  return <div className="floating-contact-actions" aria-label="Quick contact">
    <a className="floating-contact-button floating-call" href={`tel:${phone}`} aria-label={`Call ${homeContent.utility.phone}`} title={`Call ${homeContent.utility.phone}`}><PhoneIcon /></a>
    <a className="floating-contact-button floating-whatsapp" href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" title="Chat on WhatsApp"><WhatsAppIcon /></a>
  </div>;
}
