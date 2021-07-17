import React, { useState, useCallback } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

const canvasStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
};

const useConfetti = () => {
  const [intervalId, setIntervalId] = useState(null);
  const [animationInstance, setAnimationInstance] = useState(null);
  const [isAnimationEnabled, setIsAnimationEnabled] = useState(false);

  const getAnimationSettings = (originXA, originXB) => ({
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 0,
    particleCount: 150,
    origin: {
      x: randomInRange(originXA, originXB),
      y: Math.random() - 0.2,
    },
  });

  const nextTickAnimation = () => {
    if (animationInstance) {
      animationInstance(getAnimationSettings(0.1, 0.3));
      animationInstance(getAnimationSettings(0.7, 0.9));
    }
  };

  const startAnimation = () => {
    setIsAnimationEnabled(true);
    setIntervalId(setInterval(nextTickAnimation, 400));
  };

  const getInstance = instance => {
    setAnimationInstance(instance);
  };

  const Confetti = useCallback(
    () => (
      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
    ),
    [getInstance, canvasStyles]
  );

  return {
    Confetti,
  };
};
export default useConfetti;
