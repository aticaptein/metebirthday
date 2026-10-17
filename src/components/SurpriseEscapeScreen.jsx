import React, { useState } from 'react';
import { audioManager } from '../utils/audio';

// Button steps:
// 1: Center - "ASıl SÜRPRİZİ GÖR"
// 2: Center - "GERÇEKTEN İSTİYOR MUSUN?"
// 3: Right Top - "GERÇEKTEN İSTİYOR MUSUN?"
// 4: Left Top - "GERÇEKTEN İSTİYOR MUSUN?"
// 5: Left Bottom - "GERÇEKTEN İSTİYOR MUSUN?"
// 6: Right Bottom - "GERÇEKTEN İSTİYOR MUSUN?"
// 7: Center Top - "GERÇEKTEN İSTİYOR MUSUN?"
// 8: Center (Final Award) - "🔥 TAMAM HADİ ÖDÜLÜ GÖRELİM 🔥"

const BUTTON_STEPS = [
  { step: 1, posClass: 'pos-center', text: 'ASıl SÜRPRİZİ GÖR', isFire: false },
  { step: 2, posClass: 'pos-center', text: 'GERÇEKTEN İSTİYOR MUSUN?', isFire: false },
  { step: 3, posClass: 'pos-top-right', text: 'GERÇEKTEN İSTİYOR MUSUN?', isFire: false },
  { step: 4, posClass: 'pos-top-left', text: 'GERÇEKTEN İSTİYOR MUSUN?', isFire: false },
  { step: 5, posClass: 'pos-bottom-left', text: 'GERÇEKTEN İSTİYOR MUSUN?', isFire: false },
  { step: 6, posClass: 'pos-bottom-right', text: 'GERÇEKTEN İSTİYOR MUSUN?', isFire: false },
  { step: 7, posClass: 'pos-top-center', text: 'GERÇEKTEN İSTİYOR MUSUN?', isFire: false },
  { step: 8, posClass: 'pos-center', text: '🔥 TAMAM HADİ ÖDÜLÜ GÖRELİM 🔥', isFire: true }
];

export const SurpriseEscapeScreen = ({ onFinish }) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentConfig = BUTTON_STEPS[currentStepIdx];

  const handleClick = () => {
    if (isAnimating) return;

    audioManager.initContext();
    audioManager.playClick();
    setIsAnimating(true);

    if (currentConfig.isFire) {
      // Final grand award button clicked
      setTimeout(() => {
        onFinish();
      }, 350);
      return;
    }

    // Advance to next step
    setTimeout(() => {
      setCurrentStepIdx(prev => prev + 1);
      setIsAnimating(false);
    }, 280);
  };

  return (
    <div className="surprise-escape-arena">
      {/* Background hint or subtle accent */}
      <div className="surprise-atmosphere"></div>

      <div className={`escape-btn-slot ${currentConfig.posClass}`}>
        <button
          type="button"
          onClick={handleClick}
          disabled={isAnimating}
          className={`escape-button ${currentConfig.isFire ? 'fire-award-button' : 'cyber-escape-btn'} ${isAnimating ? 'btn-pressed' : ''}`}
        >
          {currentConfig.isFire && <span className="fire-glow-effect"></span>}
          <span className="btn-label">{currentConfig.text}</span>
        </button>
      </div>
    </div>
  );
};
