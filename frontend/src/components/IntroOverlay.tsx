// src/components/IntroOverlay.tsx
import { useEffect, useState } from "react";

export default function IntroOverlay() {
  // Show only once per tab
  const [visible, setVisible] = useState(
    () => !sessionStorage.getItem("mbs_intro_done")
  );

  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("mbs_intro_done", "1");
    }, 1300); // total time before unmount

    return () => clearTimeout(timer);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="intro-overlay">
      <div className="intro-badge">
        <div className="intro-badge-circle">
          <span className="intro-badge-text-main">MBS</span>
        </div>
        <span className="intro-badge-sub">Movie Booking System</span>
      </div>
    </div>
  );
}
