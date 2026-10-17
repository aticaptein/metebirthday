import confetti from 'canvas-confetti';

export const triggerQuizConfetti = () => {
  try {
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#00f0ff', '#a855f7', '#34d399', '#ffffff'],
      disableForReducedMotion: true,
      zIndex: 1000
    });
  } catch {}
};

export const triggerFinaleConfetti = () => {
  try {
    // Little but nice confetti burst as requested
    const end = Date.now() + 1200;
    const colors = ['#00f0ff', '#9333ea', '#38bdf8', '#fbbf24', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: colors,
        disableForReducedMotion: true,
        zIndex: 1000
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: colors,
        disableForReducedMotion: true,
        zIndex: 1000
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  } catch {}
};
