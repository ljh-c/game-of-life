import { useRef } from 'react';

export const useAniFrame = (aniCallback) => {
  // Use useRef for mutable variables that we want to persist
  const requestRef = useRef();
  const startTimeRef = useRef(0);

  const animateOnce = () => {
    aniCallback();
  };

  const step = () => {
    requestRef.current = requestAnimationFrame(animateOnce);
  };

  return [step];
};
