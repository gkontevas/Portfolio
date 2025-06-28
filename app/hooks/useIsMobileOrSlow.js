import { useState, useEffect } from "react";

/**
 * Custom hook to detect mobile devices or slow network connections.
 * Returns true if device is mobile or connection is slow.
 */
export function useIsMobileOrSlow() {
  const [isMobileOrSlow, setIsMobileOrSlow] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      const slow = connection && (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g' || connection.downlink < 1.5);
      setIsMobileOrSlow(mobile || slow);
      setHasChecked(true);
    };
    check();
    window.addEventListener('resize', check);
    if (navigator.connection) {
      navigator.connection.addEventListener('change', check);
    }
    return () => {
      window.removeEventListener('resize', check);
      if (navigator.connection) {
        navigator.connection.removeEventListener('change', check);
      }
    };
  }, []);

  return [isMobileOrSlow, hasChecked];
}
