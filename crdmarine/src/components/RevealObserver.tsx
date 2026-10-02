"use client";

import { useEffect } from "react";

export function RevealObserver() {
  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return null;
}
