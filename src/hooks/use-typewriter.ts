"use client";

import { useEffect, useState } from "react";

export function useTypewriter(text: string, speedMs = 28, enabled = true) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!enabled) {
      setDisplayed(text);
      return;
    }

    setDisplayed("");
    let index = 0;
    const id = window.setInterval(() => {
      index += 1;
      setDisplayed(text.slice(0, index));
      if (index >= text.length) {
        window.clearInterval(id);
      }
    }, speedMs);

    return () => window.clearInterval(id);
  }, [text, speedMs, enabled]);

  return displayed;
}
