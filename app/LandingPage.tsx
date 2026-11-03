import { homeContent } from "@/content/home";
import SiteHeader from "./SiteHeader";
import HeroSlider from "./HeroSlider";
import AdmissionEnquiryForm from "./AdmissionEnquiryForm";
import CampusVideo from "./CampusVideo";
import "./landing-page.css";

type VideoContent = { title: string; src: string; rotate?: 0 | 90 | 180 | 270 };

const promiseIcons = ["▶", "☺", "⚕", "✚"];
const valueIcons = ["✎", "☺", "✚", "♥"];
const socials = [
  { label: "Facebook", short: "f", href: "https://facebook.com" },
  { label: "X (Twitter)", short: "t", href: "https://twitter.com" },
  { label: "LinkedIn", short: "in", href: "https://linkedin.com" },
  { label: "Instagram", short: "ig", href: "https://instagram.com" },
];

export default function LandingPage() {
  const c = homeContent;
  const video = c.campusVideo as VideoContent;
  const tel = c.utility.phone.replace(/ /g, "");
  const half = Math.ceil(c.services.items.length / 2);
  const leftServices = c.services.items.slice(0, half);
  const rightServices = c.services.items.slice(half);

  return (
    <main className="lp">
      {/* Header: Home / About / Admission links stay as they are */}
      <SiteHeader current="home" homeHref="/" />

      {/* 1. Hero slider (your 2 images) */}
      <HeroSlider />

      {/* 2. The Best Medical College + Admission Enquiry */}
      <section className="lp-section lp-intro" id="admission">
        <div className="lp-wrap lp-intro-grid">
          <div className="lp-intro-text">
            <h2 className="lp-title lp-left">{c.intro.title}</h2>
            <p>{c.intro.text}</p>
            <h3>{c.intro.admission}</h3>
            <p className="lp-call">
              Call Us : <a href={`tel:${tel}`}>{c.utility.phone}</a>
            </p>
          </div>
          <div className="lp-enquiry">
            <AdmissionEnquiryForm
              adminEmail={c.utility.email}
              courses={c.enquiry.courses}
              title={c.enquiry.title}
              fields={c.enquiry}
              button={c.enquiry.action}
            />
          </div>
        </div>
      </section>

      {/* 3. Experience ICARE (video) */}
      <section className="lp-section lp-video">
        <div className="lp-wrap lp-video-head">
          <h2 className="lp-title">{video.title}</h2>
          <p className="lp-sub">
            Take a virtual walk through our campus and see the future of medical
            education.
          </p>
        </div>
        <CampusVideo src={video.src} rotate={video.rotate ?? 0} />
      </section>

      {/* 4. Choose The Best */}
      <section className="lp-section">
        <div className="lp-wrap">
          <h2 className="lp-title">{c.promise.title}</h2>
          <p className="lp-sub">{c.promise.description}</p>
          <ul className="lp-promise">
            {c.promise.items.map((item, i) => (
              <li key={item.title}>
                <span
                  className={`lp-promise-circle lp-tone-${i + 1}`}
                  aria-hidden="true"
                >
                  {promiseIcons[i % promiseIcons.length]}
                </span>
                <h3>{item.title}</h3>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. IIMSAR & BCRHH, Introduction */}
      <section className="lp-section lp-soft" id="about">
        <div className="lp-wrap lp-about-grid">
          <div className="lp-about-photo">
            <img src={c.about.image} alt={c.about.imageAlt} loading="lazy" />
          </div>
          <div>
            <h2 className="lp-heading-big">{c.about.title}</h2>
            {c.about.paragraphs.map((text) => (
              <p key={text} className="lp-about-text">
                {text}
              </p>
            ))}
            <ul className="lp-values">
              {c.about.values.map((value, i) => (
                <li key={value}>
                  <span
                    className={`lp-value-icon lp-tone-${(i % 4) + 1}`}
                    aria-hidden="true"
                  >
                    {valueIcons[i % valueIcons.length]}
                  </span>
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 6. We Provide Best Quality Services */}
      <section className="lp-section">
        <div className="lp-wrap">
          <h2 className="lp-title">{c.services.title}</h2>
          <p className="lp-sub">{c.services.description}</p>
          <div className="lp-services">
            <ul className="lp-service-col">
              {leftServices.map((item) => (
                <li key={item.title} className="lp-service">
                  <span className="lp-service-icon" aria-hidden="true">
                    {item.icon}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </li>
              ))}
            </ul>
            <div className="lp-seal" aria-hidden="true">
              <strong>{c.brand}</strong>
              <span>INSTITUTE OF MEDICAL SCIENCES &amp; RESEARCH</span>
              <b>✚</b>
            </div>
            <ul className="lp-service-col lp-service-col-right">
              {rightServices.map((item) => (
                <li key={item.title} className="lp-service">
                  <span className="lp-service-icon" aria-hidden="true">
                    {item.icon}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 7. Admission Open banner */}
      <section className="lp-cta">
        <div className="lp-wrap lp-cta-inner">
          <div
            className="lp-cta-photo"
            role="img"
            aria-label="Students attending a lecture at ICARE"
          />
          <h2>{c.cta.title}</h2>
          <p>{c.cta.text}</p>
          <a className="lp-btn lp-btn-big" href={`tel:${tel}`}>
            <span aria-hidden="true">✆</span> {c.cta.action}
          </a>
        </div>
      </section>

      {/* 8. News & Events */}
      <section className="lp-section">
        <div className="lp-wrap">
          <h2 className="lp-title">{c.news.title}</h2>
          <p className="lp-sub">{c.news.description}</p>
          <div className="lp-news">
            <div className="lp-news-panel">
              <h3 className="lp-news-head">
                <span aria-hidden="true">▤</span> Latest News
              </h3>
              <ul className="lp-feed">
                {c.news.news.map((n) => (
                  <li key={n.title + n.date} className="lp-feed-item">
                    <span className="lp-feed-icon" aria-hidden="true">
                      ≡
                    </span>
                    <div>
                      <h4>{n.title}</h4>
                      <time>{n.date}</time>
                      <p>{n.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <a className="lp-btn" href="#">
                More News
              </a>
            </div>
            <div className="lp-news-panel lp-news-dark">
              <h3 className="lp-news-head">
                <span aria-hidden="true">▣</span> Latest Events
              </h3>
              <ul className="lp-feed">
                {c.news.events.map((n) => (
                  <li key={n.title + n.date} className="lp-feed-item">
                    <span
                      className="lp-feed-icon lp-feed-event"
                      aria-hidden="true"
                    >
                      Event
                    </span>
                    <div>
                      <h4>{n.title}</h4>
                      <time>{n.date}</time>
                      <p>{n.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <a className="lp-btn" href="#">
                More Events
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Our Departments */}
      <section className="lp-section lp-depts">
        <div className="lp-wrap">
          <h2 className="lp-title lp-light">{c.departments.title}</h2>
          <p className="lp-sub lp-light">{c.departments.description}</p>
          <ul className="lp-dept-grid">
            {c.departments.items.map((name, i) => (
              <li key={name} className="lp-dept">
                <span className={`lp-dept-circle lp-dept-${i % 4}`}>
                  <em className="lp-dept-num">{i + 1}</em>
                  <b aria-hidden="true">{name.charAt(0)}</b>
                </span>
                <h3>{name}</h3>
              </li>
            ))}
          </ul>
          <div className="lp-center">
            <a className="lp-btn" href="#">
              More Departments
            </a>
          </div>
        </div>
      </section>

      {/* 10. Partner logos (add the real logo files here when you have them) */}
      <section className="lp-partners" aria-label="Partner institutes">
        <div className="lp-wrap lp-partner-row">
          {c.footer.partnerLogos.map((logo) => (
            <div key={logo} className="lp-partner" title={logo}>
              Partner Institute
            </div>
          ))}
        </div>
      </section>

      {/* 11. Footer */}
      <footer className="lp-footer">
        <div className="lp-wrap lp-footer-grid">
          <div className="lp-footer-map">
            <h3>{c.footer.locationHeading}</h3>
            <iframe
              title="ICARE Institute of Medical Sciences and Research on the map"
              src="https://www.google.com/maps?q=ICARE+Institute+of+Medical+Sciences+and+Research+Haldia&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="lp-socials">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noreferrer"
                >
                  {s.short}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3>{c.footer.quickLinksHeading}</h3>
            <ul>
              {c.footer.quickLinks.map((l) => (
                <li key={l}>
                  <a href="#">{l}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>{c.footer.departmentHeading}</h3>
            <ul>
              {c.footer.departments.map((d) => (
                <li key={d}>
                  <a href="#">{d}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>{c.footer.resourcesHeading}</h3>
            <address>
              <p>{c.footer.address}</p>
              <p>
                <a href={`tel:${tel}`}>{c.utility.phone}</a>
              </p>
              <p>
                <a href={`mailto:${c.utility.email}`}>{c.utility.email}</a>
              </p>
            </address>
          </div>
        </div>
        <div className="lp-wrap lp-footer-bar">
          <p>{c.footer.copyright}</p>
          <p>
            {c.footer.policies.map((p) => (
              <a key={p} href="#">
                {p}
              </a>
            ))}
          </p>
        </div>
      </footer>
    </main>
  );
}
