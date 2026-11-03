import { homeContent } from "@/content/home";
import ScrollAnimator from "./ScrollAnimator";
import SiteHeader from "./SiteHeader";
import AdmissionEnquiryForm from "./AdmissionEnquiryForm";
import HeroSlider from "./HeroSlider";
import AdvantageCarousel from "./AdvantageCarousel";

function ArrowIcon() {
  return <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="M4 10h11M10 5l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function CheckIcon() {
  return <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="m5 10 3.2 3.2L15.5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function SectionHeading({ title, description, light = false }: { title: string; description: string; light?: boolean }) {
  return <div className={`section-heading ${light ? "light" : ""}`}><h2>{title}</h2><p>{description}</p></div>;
}

export default function HomePageContent({ landing = false }: { landing?: boolean }) {
  const { utility, update, hero, intro, enquiry, campusVideo, promise, about, services, cta, news, departments, footer } = homeContent;
  const phoneLink = `tel:${utility.phone.replaceAll(" ", "")}`;

  return (
    <main className={`site-shell${landing ? " landing-page" : ""}`}>
      <ScrollAnimator />
      <SiteHeader current="home" update={update} homeHref={landing ? "/" : "/home"} />

      {landing ? <HeroSlider /> : <section className="hero" id="home" style={{ backgroundImage: `url("${hero.image}")` }} aria-label="Welcome">
        <div className="hero-shade" /><div className="hero-inner">
          <div className="hero-copy"><h1>{hero.title}<br /><strong>{hero.highlight}</strong><br />{hero.titleEnd}</h1><p className="hero-description">{hero.description}</p><a className="primary-action" href="#about">{hero.action}<ArrowIcon /></a><div className="hero-stats">{hero.stats.map((stat) => <div className="hero-stat" key={stat.number}><strong>{stat.number}</strong><span>{stat.label}</span></div>)}</div></div>
        </div>
      </section>}

      {landing && <AdvantageCarousel />}

      <section className="intro-section content-width" id="admission">
        <div className="intro-copy"><h2>{intro.title}</h2><p>{intro.text}</p><h3>{intro.admission}</h3><p className="call-line">Call Us : <a href={phoneLink}>{utility.phone}</a></p></div>
        <AdmissionEnquiryForm adminEmail={utility.email} courses={enquiry.courses} title={enquiry.title} fields={enquiry} button={enquiry.action} />
      </section>

      <section className="campus-video-section section-pad" aria-label="Campus video">
        <div className="content-width"><SectionHeading title="Experience ICARE" description="Take a virtual walk through our campus and see the future of medical education." /><div className="campus-video-layout content-width"><div className="campus-video-frame"><video controls playsInline preload="metadata"><source src={campusVideo.src} type="video/mp4" /></video></div></div></div>
      </section>

      <section className="promise-section section-pad"><div className="content-width"><SectionHeading title={promise.title} description={promise.description} /><div className="promise-grid">{promise.items.map((item, index) => <article className="promise-card" key={item.title}><span className="promise-symbol">{["✦", "✣", "✚", "⌂"][index]}</span><h3>{item.title}</h3></article>)}</div></div></section>

      <section className="about-section section-pad" id="about"><div className="about-grid content-width"><div className="about-photo"><img src={about.image} alt={about.imageAlt} /></div><div className="about-copy"><h2>{about.title}</h2>{about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<ul>{about.values.map((value) => <li key={value}><span className="check-icon"><CheckIcon /></span>{value}</li>)}</ul></div></div></section>

      <section className="services-section section-pad"><div className="content-width"><SectionHeading title={services.title} description={services.description} /><div className="services-grid">{services.items.map((item) => <article className="service-card" key={item.title}><span className="service-icon">{item.icon}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></div></section>

      <section className="admission-banner"><div className="banner-inner content-width"><div className="banner-student"><img src="/images/admission-student.png" alt="" /></div><div><h2>{cta.title}</h2><p>{cta.text}</p></div><a className="pink-button" href={phoneLink}>{cta.action}<ArrowIcon /></a></div></section>

      <section className="news-section section-pad"><div className="content-width"><SectionHeading title={news.title} description={news.description} /><div className="news-grid"><div className="news-panel"><h3><span>▤</span> Latest News</h3>{news.news.map((item) => <article className="news-item" key={item.title}><span className="news-date">{item.date}</span><div><h4>{item.title}</h4><p>{item.text}</p></div><ArrowIcon /></article>)}<a className="text-link" href="#admission">More News <ArrowIcon /></a></div><div className="events-panel"><h3><span>✦</span> Latest Events</h3>{news.events.map((item) => <article className="event-item" key={item.title}><span className="event-date">{item.date}</span><div><h4>{item.title}</h4><p>{item.text}</p></div></article>)}<a className="light-link" href="#departments">More Events <ArrowIcon /></a></div></div></div></section>

      <section className="departments-section section-pad" id="departments"><div className="content-width"><SectionHeading title={departments.title} description={departments.description} light /><div className="departments-grid">{departments.items.map((department, index) => <a className="department-item" href="#admission" key={department}><span>{String(index + 1).padStart(2, "0")}</span><strong>{department}</strong><ArrowIcon /></a>)}</div><a className="outline-button" href="#departments">More Departments <ArrowIcon /></a></div></section>

      <section className="partner-logo-strip" aria-label="Partner logos"><div className="partner-track">{[0, 1].map((copy) => <div className="partner-logo-group" key={copy} aria-hidden={copy === 1}>{footer.partnerLogos.map((logo) => <img key={`${copy}-${logo}`} src={`https://icaremedicalcollege.co/public/website/img/${logo}`} alt="" loading="lazy" />)}</div>)}</div></section>

      <footer className="site-footer">
        <div className="footer-main content-width">
          <div className="footer-map"><h3>{footer.locationHeading}</h3><iframe title={footer.locationHeading} src="https://maps.google.com/maps?q=ICARE%20Institute%20of%20Medical%20Sciences%20Haldia&t=&z=14&ie=UTF8&iwloc=&output=embed" loading="lazy" /><a className="map-link" href="https://maps.google.com/?q=ICARE+Institute+of+Medical+Sciences+Haldia" target="_blank" rel="noreferrer">Open in Maps</a><div className="social-links" aria-label="Social links"><a href="https://facebook.com" aria-label="Facebook">f</a><a href="https://twitter.com" aria-label="Twitter">♥</a><a href="https://linkedin.com" aria-label="LinkedIn">in</a><a href="https://instagram.com" aria-label="Instagram">◎</a></div></div>
          <div><h3>{footer.quickLinksHeading}</h3>{footer.quickLinks.map((item) => <a href="#about" key={item}>{item}</a>)}</div>
          <div><h3>{footer.departmentHeading}</h3>{footer.departments.map((item) => <a href="#departments" key={item}>{item}</a>)}</div>
          <div className="footer-resources"><h3>{footer.resourcesHeading}</h3><p>{footer.address}</p><a href={phoneLink}>{utility.phone}</a><a href={`mailto:${utility.email}`}>{utility.email}</a></div>
        </div>
        <div className="footer-bottom content-width"><span>{footer.copyright}</span><span><a href="#">{footer.policies[0]}</a><i /> <a href="#">{footer.policies[1]}</a></span></div>
      </footer>
    </main>
  );
}
