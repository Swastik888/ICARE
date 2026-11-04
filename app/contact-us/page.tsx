import type { Metadata } from "next";
import { homeContent } from "@/content/home";
import ContactForm from "../ContactForm";
import ScrollAnimator from "../ScrollAnimator";
import SiteHeader from "../SiteHeader";

const contactUpdates = [
  "International Yoga Day Celebration 21st June 2023",
  "Mental Health Awareness",
  "International Yoga Day Celebration 21st June 2022",
];

export const metadata: Metadata = {
  title: "Contact Us | ICARE Institute of Medical Sciences and Research",
  description:
    "Contact ICARE Institute of Medical Sciences and Research and Dr. Bidhan Chandra Roy Hospital, Haldia.",
};

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path
        d="M4 10h11M10 5l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ContactIcon({ kind }: { kind: "phone" | "pin" | "mail" }) {
  if (kind === "phone")
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32" fill="none">
        <rect
          x="9"
          y="3.5"
          width="14"
          height="25"
          rx="2.5"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M13 7h6M14.5 24.5h3"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  if (kind === "pin")
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32" fill="none">
        <path
          d="M25 13c0 7-9 16-9 16s-9-9-9-16a9 9 0 1 1 18 0Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <circle cx="16" cy="13" r="3" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" fill="none">
      <rect
        x="3.5"
        y="7"
        width="25"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="m5 9 11 9 11-9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ContactUsPage() {
  const { utility, footer } = homeContent;
  const phoneHref = `tel:${utility.phone.replaceAll(" ", "")}`;
  const directionsHref =
    "https://www.google.com/maps/dir/?api=1&destination=22.0641352%2C88.0359571";
  const mapEmbed =
    "https://maps.google.com/maps?q=22.0641352%2C88.0359571&z=15&output=embed";

  return (
    <main className="site-shell contact-page">
      <ScrollAnimator />
      <SiteHeader current="contact" update={contactUpdates.join("  •  ")} />

      <section className="contact-hero" aria-labelledby="contact-title">
        <div className="contact-hero-shade" />
        <div className="contact-hero-content">
          <h1 id="contact-title">Contact Us</h1>
          <p>
            <a href="/home">Home</a>
            <span aria-hidden="true">›</span>
            <span>Contact Us</span>
          </p>
        </div>
        <div className="contact-hero-wave" aria-hidden="true" />
      </section>

      <section className="contact-details-section">
        <div className="contact-info-grid content-width">
          <a
            className="contact-info-card"
            href={phoneHref}
            aria-label={`Call ${utility.phone}`}
          >
            <span className="contact-icon">
              <ContactIcon kind="phone" />
            </span>
            <h2>Call Us</h2>
            <span>{utility.phone}</span>
          </a>
          <a
            className="contact-info-card"
            href={directionsHref}
            target="_blank"
            rel="noreferrer"
            aria-label="Get directions to ICARE in Haldia"
          >
            <span className="contact-icon">
              <ContactIcon kind="pin" />
            </span>
            <h2>Visit Us</h2>
            <span className="contact-address-link">
              Banbishnupur, P.O. - Balughata,
              <br /> PIN - 721 645, Haldia, Purba Medinipur
            </span>
          </a>
          <a
            className="contact-info-card"
            href={`mailto:${utility.email}`}
            aria-label={`Email ${utility.email}`}
          >
            <span className="contact-icon">
              <ContactIcon kind="mail" />
            </span>
            <h2>Mail Us</h2>
            <span className="contact-email-link">{utility.email}</span>
          </a>
        </div>
      </section>

      <section className="contact-main-section">
        <div className="contact-main-grid content-width">
          <ContactForm adminEmail={utility.email} />
          <div className="contact-location-copy">
            <h2>Find out us on Google map</h2>
            <a
              className="directions-button"
              href={directionsHref}
              target="_blank"
              rel="noreferrer"
            >
              Get Directions <ArrowIcon />
            </a>
            <div className="contact-rule" />
            <h3>Our Headquarters</h3>
            <p>
              Banbishnupur, P.O. - Balughata, PIN - 721 645,
              <br />
              Haldia, Purba Medinipur (W.B)
            </p>
            <p className="contact-direct-line">
              Phone: <a href={phoneHref}>{utility.phone}</a>
              <br />
              Email: <a href={`mailto:${utility.email}`}>{utility.email}</a>
            </p>
          </div>
        </div>
      </section>

      <section className="contact-map-section" aria-label="ICARE campus map">
        <div className="contact-map">
          <iframe
            title="Google map to ICARE Institute of Medical Sciences and Research, Haldia"
            src={mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a
            className="contact-map-card"
            href={directionsHref}
            target="_blank"
            rel="noreferrer"
          >
            <strong>ICARE Institute of Medical Science and Research</strong>
            <span>
              Banbishnupur, PO, Balughata Rd, Haldia, West Bengal 721657
            </span>
            <b>
              Open in Maps <ArrowIcon />
            </b>
          </a>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-main footer-main-compact content-width">
          <div className="footer-map">
            <h3>{footer.locationHeading}</h3>
            <iframe
              title={footer.locationHeading}
              src="https://maps.google.com/maps?q=ICARE%20Institute%20of%20Medical%20Sciences%20Haldia&t=&z=14&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
            />
            <a
              className="map-link"
              href="https://maps.google.com/?q=ICARE+Institute+of+Medical+Sciences+Haldia"
              target="_blank"
              rel="noreferrer"
            >
              Open in Maps
            </a>
          </div>
          <div className="footer-resources">
            <h3>{footer.resourcesHeading}</h3>
            <p>{footer.address}</p>
            <a href={phoneHref}>{utility.phone}</a>
            <a href={`mailto:${utility.email}`}>{utility.email}</a>
          </div>
        </div>
        <div className="footer-bottom content-width">
          <span>{footer.copyright}</span>
          <span>
            <a href="#">{footer.policies[0]}</a>
            <i /> <a href="#">{footer.policies[1]}</a>
          </span>
        </div>
      </footer>
    </main>
  );
}
