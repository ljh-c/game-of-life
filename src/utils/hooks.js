import { useRef, useState } from 'react';

export const useAniFrame = (aniCallback, interval) => {
  const [period, setPeriod] = useState(interval);

  // Use useRef for mutable variables that we want to persist
  const requestRef = useRef();
  const startTimeRef = useRef(0);

  const animateOnce = () => {
    aniCallback();
  };

  // Callback function of requestAnimationFrame is automatically passed a timestamp
  // indicating the time requestAnimationFrame() was called
  const animateRecursively = (timestamp) => {
    if (timestamp - startTimeRef.current >= period) {
      aniCallback();

      startTimeRef.current = timestamp;
    }

    requestRef.current = requestAnimationFrame(animateRecursively);
  };

  const step = () => {
    requestRef.current = requestAnimationFrame(animateOnce);
  };

  const start = () => {
    requestRef.current = requestAnimationFrame(animateRecursively);
  };

  const stop = () => {
    cancelAnimationFrame(requestRef.current);
  };

  return [step, start, stop, setPeriod];
};
