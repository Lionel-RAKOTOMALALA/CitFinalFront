"use client";

import { useEffect, useState } from "react";
import { PageLoader } from "@/components/layout/page-loader";

const MIN_DISPLAY_MS = 450;

export function InitialPageLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const startedAt = Date.now();

    const hide = () => {
      const elapsed = Date.now() - startedAt;
      const delay = Math.max(0, MIN_DISPLAY_MS - elapsed);
      window.setTimeout(() => setShow(false), delay);
    };

    if (document.readyState === "complete") {
      hide();
    } else {
      window.addEventListener("load", hide, { once: true });
    }

    return () => window.removeEventListener("load", hide);
  }, []);

  if (!show) return null;

  return <PageLoader variant="fullscreen" label="Préparation de votre expérience..." />;
}
