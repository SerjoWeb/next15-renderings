import { useEffect, useRef } from "react";

type Handler = (event: MouseEvent) => void;

const useOutsideClick = <T extends HTMLDivElement = HTMLDivElement>(
  handler: Handler,
  listenCapturing: boolean = true
) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(event);
      }
    };

    if (typeof window !== "undefined") {
        document.addEventListener('mousedown', handleClickOutside, listenCapturing);

        return () => {
        document.removeEventListener('mousedown', handleClickOutside, listenCapturing);
        };
    }

    return () => null;
  }, [handler, listenCapturing]);

  return ref;
};

export default useOutsideClick;
