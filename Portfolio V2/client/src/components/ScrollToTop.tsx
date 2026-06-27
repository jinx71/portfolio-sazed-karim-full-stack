import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Reset scroll position on route change (but preserve in-page hash anchors).
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);
  return null;
}
