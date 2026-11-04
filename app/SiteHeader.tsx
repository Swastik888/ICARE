import { homeContent } from "@/content/home";

type SiteHeaderProps = { current?: "home" | "contact"; update?: string; homeHref?: string };

export default function SiteHeader({ current, update = homeContent.update, homeHref = "/home" }: SiteHeaderProps) {
  const { utility, navigation } = homeContent;
  const navHref = (item: string) => {
    if (item === "Home") return homeHref;
    if (item === "About") return `${homeHref}#about`;
    if (item === "Admission") return `${homeHref}#admission`;
    if (item === "Departments") return `${homeHref}#departments`;
    return "#";
  };

  return (
    <header className="site-header">
      <div className="utility-header content-width">
        <a className="brand-lockup" href={homeHref} aria-label="ICARE home page"><img src="/images/icare-logo.png" alt="ICARE Institute of Medical Sciences and Research" /></a>
        <div className="utility-contacts" aria-label="Contact information">
          <a href={`tel:${utility.phone.replaceAll(" ", "")}`}><span aria-hidden="true">☎</span>{utility.phone}</a>

        </div>
      </div>

      <nav className="navigation" aria-label="Main navigation">
        <div className="nav-links">{navigation.map((item) => <a className={current === "home" && item === "Home" ? "active" : ""} href={navHref(item)} key={item}>{item}</a>)}</div>
        <a className="contact-link" href="/contact-us" aria-current={current === "contact" ? "page" : undefined}>Contact Us <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="M4 10h11M10 5l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></a>
      </nav>
    </header>
  );
}
