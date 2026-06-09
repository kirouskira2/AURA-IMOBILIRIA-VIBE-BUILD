import { useState, useEffect, useRef } from "react";

export function useScrollNav() {
  const [scrolled, setScrolled] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      if (currentScrollY <= 20) {
        setIsNavVisible(true);
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      } else {
        if (currentScrollY < lastScrollY.current) {
          setIsNavVisible(true);
          if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
          scrollTimeout.current = setTimeout(() => {
            setIsNavVisible(false);
          }, 2000);
        } else if (currentScrollY > lastScrollY.current) {
          setIsNavVisible(false);
          if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        }
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  useEffect(() => {
    // Prevent dev environment from caching the scroll position or URL hash
    window.scrollTo(0, 0);
    if (window.location.hash) {
      setTimeout(() => {
        window.history.replaceState(null, "", window.location.pathname);
        window.scrollTo(0, 0);
      }, 50);
    }
  }, []);

  return { scrolled, isNavVisible };
}
