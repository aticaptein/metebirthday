import React, { useEffect, useState } from 'react';
import metehanPhoto from '../assets/metehan.jpg';
import { triggerFinaleConfetti } from '../utils/confetti';
import { audioManager } from '../utils/audio';

export const FinaleScreen = () => {
  // Phase 1: dark / initial
  // Phase 2: spinning & growing
  // Phase 3: landed & burst & text
  const [phase, setPhase] = useState('initial');
  const [burstGlow, setBurstGlow] = useState(false);

  useEffect(() => {
    // 1. Initial dark screen pause
    const t1 = setTimeout(() => {
      setPhase('spinning');
    }, 400);

    // 2. Spin & Grow finishes around 2.8s
    const t2 = setTimeout(() => {
      setPhase('landed');
      setBurstGlow(true);
      audioManager.playFinaleChord();
      triggerFinaleConfetti();
    }, 3200);

    // 3. Remove burst flash intensity after 800ms
    const t3 = setTimeout(() => {
      setBurstGlow(false);
    }, 4000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="finale-container">
      {/* Photo with container keeping original aspect ratio */}
      <div
        className={`photo-wrapper ${
          phase === 'initial'
            ? 'anim-initial'
            : phase === 'spinning'
            ? 'anim-spinning'
            : 'anim-landed'
        } ${burstGlow ? 'glow-burst' : ''}`}
      >
        <img
          src={metehanPhoto}
          alt="Metehan Sandal"
          className="finale-photo"
        />
      </div>

      {/* Birthday text appears when landed and remains fixed */}
      {phase === 'landed' && (
        <div className="finale-title-container" style={{ animation: 'fadeIn 0.6s ease-out' }}>
          <h1 className="finale-title">
            Doğum günün kutlu olsun Metehan Sandal
          </h1>
        </div>
      )}
    </div>
  );
};
