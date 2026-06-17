import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Reset window scroll
    window.scrollTo(0, 0);
    // Also reset document body and root element
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    // Reset the root div
    const root = document.getElementById("root");
    if (root) root.scrollTop = 0;
  }, [pathname]);

  return null;
}