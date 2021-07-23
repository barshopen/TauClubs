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
  const [animationInstance, setAnimationInstance] = useState(null);

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
