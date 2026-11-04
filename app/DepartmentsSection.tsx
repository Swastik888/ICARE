"use client";

import { useState } from "react";
import { homeContent } from "@/content/home";

function ArrowIcon() {
  return <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="M4 10h11M10 5l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function DepartmentsSection() {
  const { departments } = homeContent;
  const [expanded, setExpanded] = useState(false);
  const existingNames = new Set(departments.items.map((name) => name.trim().toLowerCase()));
  const additionalDepartments = departments.moreItems.filter((department) => !existingNames.has(department.title.toLowerCase()));

  return (
    <section className="departments-section section-pad" id="departments">
      <div className="content-width">
        <div className="section-heading light">
          <h2>{departments.title}</h2>
          <p>{departments.description}</p>
        </div>
        <div className="departments-grid" id="additional-departments">
          {departments.items.map((department, index) => {
            const href = department === "Community Medicine"
              ? "https://icaremedicalcollege.co/department-details/13.html"
              : "#admission";
            return <a className="department-item" href={href} key={department}>
              <span>{String(index + 1).padStart(2, "0")}</span><strong>{department}</strong><ArrowIcon />
            </a>;
          })}
          {expanded && additionalDepartments.map((department, index) => <a className="department-item department-item-added" href={department.href} key={department.title} target="_blank" rel="noreferrer">
            <span>{String(departments.items.length + index + 1).padStart(2, "0")}</span><strong>{department.title}</strong><ArrowIcon />
          </a>)}
        </div>
        <button
          className="outline-button"
          type="button"
          aria-expanded={expanded}
          aria-controls="additional-departments"
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? "Show Less" : "More Departments"}<ArrowIcon />
        </button>
        <span className="visually-hidden" aria-live="polite">
          {expanded ? `${additionalDepartments.length} more departments shown` : "Additional departments are hidden"}
        </span>
      </div>
    </section>
  );
}
