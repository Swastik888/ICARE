import { homeContent } from "@/content/home";

type SiteHeaderProps = { current?: "home" | "contact"; update?: string; homeHref?: string };

export default function SiteHeader({ current, update = homeContent.update, homeHref = "/home" }: SiteHeaderProps) {
  const { utility, navigation } = homeContent;
  const navHref = (item: string) => {
    if (item === "Home") return homeHref;
    if (item === "About") return `${homeHref}#about`;
    if (item === "Admission") return `${homeHref}#admission`;
    return "#";
  };

  return (
    <header className="site-header">
      <div className="utility-header content-width">
        <a className="brand-lockup" href={homeHref} aria-label="ICARE home page"><img src="/images/icare-logo.png" alt="ICARE Institute of Medical Sciences and Research" /></a>
        <div className="utility-contacts" aria-label="Contact information">
          <a href={`tel:${utility.phone.replaceAll(" ", "")}`}><span aria-hidden="true">☎</span>{utility.phone}</a>
          <a href={`tel:${utility.hospitalPhone.replaceAll(" ", "")}`}><span aria-hidden="true">✚</span>Hospital: {utility.hospitalPhone}</a>
          <a href={`mailto:${utility.email}`}><span aria-hidden="true">✉</span>{utility.email}</a>
        </div>
        <div className="header-socials" aria-label="Social media">
          <a href="https://facebook.com" aria-label="Facebook">f</a>
          <a href="https://instagram.com" aria-label="Instagram">◎</a>
          <a href="https://wa.me/917908022278" aria-label="WhatsApp">◉</a>
        </div>
      </div>
      <nav className="navigation" aria-label="Main navigation">
        <div className="nav-links">{navigation.map((item) => <a className={current === "home" && item === "Home" ? "active" : ""} href={navHref(item)} key={item}>{item}</a>)}</div>
        <a className="contact-link" href="/contact-us" aria-current={current === "contact" ? "page" : undefined}>Contact Us <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="M4 10h11M10 5l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></a>
      </nav>
      <div className="updates-bar"><span>Latest Updates</span><div className="updates-marquee" aria-label={update}><div className="updates-track"><span>{update}</span><span aria-hidden="true">{update}</span></div></div></div>
    </header>
  );
}
