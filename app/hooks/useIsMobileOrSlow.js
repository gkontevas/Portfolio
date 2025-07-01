import { useState, useEffect } from "react";

/**
 * Custom hook to detect mobile devices (user agent) OR small screens in development.
 * Returns true if device is a mobile device (user agent) or (in dev) if window.innerWidth < 768.
 */
export function useIsMobileOrSlow() {
  const [isMobileOrSlow, setIsMobileOrSlow] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    const check = () => {
      const userAgentMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      let devScreenMobile = false;
      if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
        devScreenMobile = window.innerWidth < 768;
      }
      setIsMobileOrSlow(userAgentMobile || devScreenMobile);
      setHasChecked(true);
    };
    check();
  }, []);

  return [isMobileOrSlow, hasChecked];
}
