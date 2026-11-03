"use client";

import type { CSSProperties } from "react";

type CampusVideoProps = {
  src?: string;
  rotate?: 0 | 90 | 180 | 270;
  aspectRatio?: string;
};

export default function CampusVideo({
  src = "https://icaremedicalcollege.co/storage/app/IMG_0193.MP4",
  rotate = 90,
  aspectRatio = "16 / 9",
}: CampusVideoProps) {
  const sideways = rotate === 90 || rotate === 270;

  const frame: CSSProperties = {
    position: "relative",
    width: "100%",
    aspectRatio,
    overflow: "hidden",
    background: "#000",
    containerType: "size",
  };

  const video: CSSProperties = sideways
    ? {
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "100cqh",
        height: "100cqw",
        objectFit: "cover",
        transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
      }
    : {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transform: rotate === 180 ? "rotate(180deg)" : undefined,
      };

  return (
    <div style={frame}>
      <video
        src={src}
        style={video}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Video walk through the ICARE campus"
      />
    </div>
  );
}
