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
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      localStorage.setItem("isOnline", "false");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Update localStorage with current state
    localStorage.setItem("isOnline", JSON.stringify(isOnline));

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [isOnline]);

  return isOnline;
};