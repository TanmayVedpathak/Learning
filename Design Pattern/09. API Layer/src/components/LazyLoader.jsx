import { useState, useEffect } from "react";

const LazyLoader = ({ show, delay, defaultContent }) => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    let timeout;
    if (!show) {
      setShowLoader(false);
      return;
    }

    if (delay === 0) {
      setShowLoader(true);
    } else {
      timeout = setTimeout(() => setShowLoader(true), delay);
    }

    return () => {
      clearInterval(timeout);
    };
  }, [show, delay]);

  return showLoader ? "Loading..." : defaultContent;
};

export default LazyLoader;
