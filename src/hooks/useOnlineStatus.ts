import { useState, useEffect } from "react";

export const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(() => {
    // Get the last known state from localStorage, default to navigator.onLine
    const lastKnownState = localStorage.getItem("isOnline");
    return lastKnownState ? JSON.parse(lastKnownState) : navigator.onLine;
  });

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      localStorage.setItem("isOnline", "true");
      // Trigger a custom event that other components can listen to
      window.dispatchEvent(new CustomEvent('onlineStatusChange', { 
        detail: { isOnline: true } 
      }));
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      localStorage.setItem("isOnline", "false");
      // Trigger a custom event that other components can listen to
      window.dispatchEvent(new CustomEvent('offlineStatusChange', { 
        detail: { isOnline: false } 
      }));
    };

    // Handle page visibility changes
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // When page becomes visible, check connection
        if (navigator.onLine !== isOnline) {
          if (navigator.onLine) {
            handleOnline();
          } else {
            handleOffline();
          }
        }
      }
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Update localStorage with current state
    localStorage.setItem("isOnline", JSON.stringify(isOnline));

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isOnline]);

  return isOnline;
};