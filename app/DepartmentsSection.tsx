"use client";

import { useState } from "react";
import { homeContent } from "@/content/home";

type DepartmentLink = { title: string; href?: string };

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

function getHref(href?: string) {
  return typeof href === "string" && href.length > 0 ? href : "#admission";
}

export default function DepartmentsSection() {
  const { departments } = homeContent;
  const [expanded, setExpanded] = useState(false);

  const existingNames = new Set(
    departments.items.map((name) => name.trim().toLowerCase()),
  );
  const additionalDepartments = (
    departments.moreItems as DepartmentLink[]
  ).filter(
    (department) => !existingNames.has(department.title.trim().toLowerCase()),
  );

  return (
    <section className="departments-section section-pad" id="departments">
      <div className="content-width">
        <div className="section-heading light">
          <h2>{departments.title}</h2>
          <p>{departments.description}</p>
        </div>

        <div className="departments-grid" id="additional-departments">
          {departments.items.map((department, index) => {
            const isCommunity = department === "Community Medicine";
            const href = isCommunity
              ? "https://icaremedicalcollege.co/department-details/13.html"
              : "#admission";
            return (
              <a
                className="department-item"
                href={href}
                key={department}
                {...(isCommunity
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{department}</strong>
                <ArrowIcon />
              </a>
            );
          })}

          {expanded &&
            additionalDepartments.map((department, index) => {
              const href = getHref(department.href);
              const external = href.startsWith("http");
              return (
                <a
                  className="department-item department-item-added"
                  href={href}
                  key={department.title}
                  {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                >
                  <span>
                    {String(departments.items.length + index + 1).padStart(
                      2,
                      "0",
                    )}
                  </span>
                  <strong>{department.title}</strong>
                  <ArrowIcon />
                </a>
              );
            })}
        </div>

        <button
          className="outline-button"
          type="button"
          aria-expanded={expanded}
          aria-controls="additional-departments"
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? "Show Less" : "More Departments"}
          <ArrowIcon />
        </button>

        <span className="visually-hidden" aria-live="polite">
          {expanded
            ? `${additionalDepartments.length} more departments shown`
            : "Additional departments are hidden"}
        </span>
      </div>
    </section>
  );
}
