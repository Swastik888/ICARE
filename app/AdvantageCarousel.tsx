"use client";

import { useState } from "react";

const images = [
  { src: "/images/advantage-anatomy.jpg", alt: "Medical students learning anatomy with a teaching skeleton" },
  { src: "/images/advantage-classroom.jpg", alt: "Medical students attending a lecture" },
  { src: "/images/advantage-hostel.jpg", alt: "Student hostel room" },
];

export default function AdvantageCarousel() {
  const [start, setStart] = useState(0);
  const ordered = images.map((_, index) => images[(index + start) % images.length]);

  return <section className="advantage-section section-pad" aria-labelledby="advantage-title">
    <div className="content-width">
      <h2 id="advantage-title">THE ICARE ADVANTAGE</h2>
      <div className="advantage-carousel">
        <button className="advantage-arrow advantage-prev" type="button" onClick={() => setStart((value) => (value + images.length - 1) % images.length)} aria-label="Previous ICARE Advantage image">‹</button>
        <div className="advantage-grid" aria-live="polite">
          {ordered.map((image) => <figure className="advantage-photo" key={image.src}>
            <img src={image.src} alt={image.alt} loading="lazy" />
          </figure>)}
        </div>
        <button className="advantage-arrow advantage-next" type="button" onClick={() => setStart((value) => (value + 1) % images.length)} aria-label="Next ICARE Advantage image">›</button>
      </div>
      <div className="advantage-dots" aria-label="Choose a set of ICARE Advantage images">
        {images.map((image, index) => <button key={image.src} type="button" className={start === index ? "active" : ""} onClick={() => setStart(index)} aria-label={`Show image set ${index + 1}`} aria-pressed={start === index} />)}
      </div>
    </div>
  </section>;
}
