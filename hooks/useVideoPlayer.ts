import { useState, useEffect, useRef } from "react";

export function useVideoPlayer(scrolled: boolean) {
  const [isVideoIntersecting, setIsVideoIntersecting] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const toggleMute = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const command = isMuted ? 'unMute' : 'mute';
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: command, args: [] }),
        '*'
      );
      setIsMuted(!isMuted);
    }
  };

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

  const [hasAutoUnmuted, setHasAutoUnmuted] = useState(false);

  useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      if (isVideoIntersecting && scrolled) {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: 'playVideo', args: [] }),
          '*'
        );
        
        if (!hasAutoUnmuted) {
          iframeRef.current.contentWindow.postMessage(
            JSON.stringify({ event: 'command', func: 'unMute', args: [] }),
            '*'
          );
          setTimeout(() => {
            setIsMuted(false);
            setHasAutoUnmuted(true);
          }, 0);
        }
      } else {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }),
          '*'
        );
      }
    }
  }, [isVideoIntersecting, scrolled, iframeLoaded, hasAutoUnmuted]);

  return { iframeRef, iframeLoaded, setIframeLoaded, isMuted, toggleMute };
}
