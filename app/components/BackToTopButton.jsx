"use client";
import { useEffect, useState } from "react";

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white shadow-lg hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
      style={{ fontSize: 24 }}
    >
      ↑
    </button>
  );
}
