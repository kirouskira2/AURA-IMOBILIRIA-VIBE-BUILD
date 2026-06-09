import { useState, useEffect, useRef } from "react";

export function useVideoPlayer(scrolled: boolean) {
  const [isVideoIntersecting, setIsVideoIntersecting] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setIsVideoIntersecting(entry.isIntersecting);
      });
    }, { threshold: 0.1 });

    const currentIframe = iframeRef.current;
    if (currentIframe) {
      observer.observe(currentIframe);
    }

    return () => {
      if (currentIframe) observer.unobserve(currentIframe);
    };
  }, []);

  useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      if (isVideoIntersecting && scrolled) {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: 'playVideo', args: [] }),
          '*'
        );
      } else {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }),
          '*'
        );
      }
    }
  }, [isVideoIntersecting, scrolled, iframeLoaded]);

  return { iframeRef, iframeLoaded, setIframeLoaded };
}
