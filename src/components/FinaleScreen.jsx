import React, { useEffect, useState } from 'react';
import metehanPhoto from '../assets/metehan.jpg';
import mangalPhoto from '../assets/mangal.jpg';
import sigaraPhoto from '../assets/sigara.jpg';
import { triggerFinaleConfetti } from '../utils/confetti';

export const FinaleScreen = () => {
  // Phase 1: dark / initial
  // Phase 2: spinning & growing
  // Phase 3: landed & burst & text
  const [phase, setPhase] = useState('initial');
  const [burstGlow, setBurstGlow] = useState(false);

  // Gallery order state
  // Default: Center = metehan, Left = mangal, Right = sigara
  const [slots, setSlots] = useState({
    left: 'mangal',
    center: 'metehan',
    right: 'sigara'
  });

  const photoMap = {
    metehan: { src: metehanPhoto, alt: 'Metehan Sandal' },
    mangal: { src: mangalPhoto, alt: 'Metehan Mangal' },
    sigara: { src: sigaraPhoto, alt: 'Metehan Sigara' }
  };

  useEffect(() => {
    // Start spinning immediately on mount so there is never a flash of the card
    setPhase('spinning');

    // Fallback timer (in case onAnimationEnd is not fired by browser)
    const fallbackTimer = setTimeout(() => {
      setPhase(prev => {
        if (prev === 'spinning') {
          setBurstGlow(true);
          triggerFinaleConfetti();
          setTimeout(() => setBurstGlow(false), 800);
          return 'landed';
        }
        return prev;
      });
    }, 3200);

    return () => {
      clearTimeout(fallbackTimer);
    };
  }, []);

  // When left photo is clicked, it swaps to center, previous center moves to right/left
  const handleLeftClick = () => {
    if (phase !== 'landed') return;
    setSlots(prev => ({
      left: prev.center,
      center: prev.left,
      right: prev.right
    }));
  };

  // When right photo is clicked, it swaps to center
  const handleRightClick = () => {
    if (phase !== 'landed') return;
    setSlots(prev => ({
      left: prev.left,
      center: prev.right,
      right: prev.center
    }));
  };

  const handleSpinEnd = () => {
    if (phase === 'spinning') {
      setPhase('landed');
      setBurstGlow(true);
      triggerFinaleConfetti();
      setTimeout(() => {
        setBurstGlow(false);
      }, 800);
    }
  };

  return (
    <div className={`finale-container ${phase === 'landed' ? 'finale-ready' : ''}`}>
      {/* 3-Photo Compact Deck Gallery Container */}
      <div className="gallery-deck-container">
        {/* Left Photo (behind, exactly 20% visible peeking from left) */}
        <div
          className={`deck-card slot-left ${phase === 'landed' ? 'slot-visible' : 'slot-hidden'}`}
          onClick={handleLeftClick}
          role="button"
          tabIndex={0}
          aria-label="Soldaki Fotoğrafı Büyüt"
        >
          <img
            src={photoMap[slots.left].src}
            alt={photoMap[slots.left].alt}
            className="deck-photo"
          />
        </div>

        {/* Center Main Photo (Keeps original spin/grow animation and exact look) */}
        <div
          onAnimationEnd={handleSpinEnd}
          className={`deck-card slot-center ${
            phase === 'initial'
              ? 'anim-initial'
              : phase === 'spinning'
              ? 'anim-spinning'
              : 'anim-landed'
          } ${burstGlow ? 'glow-burst' : ''}`}
        >
          <img
            src={photoMap[slots.center].src}
            alt={photoMap[slots.center].alt}
            className="deck-photo"
          />
        </div>

        {/* Right Photo (behind, exactly 20% visible peeking from right) */}
        <div
          className={`deck-card slot-right ${phase === 'landed' ? 'slot-visible' : 'slot-hidden'}`}
          onClick={handleRightClick}
          role="button"
          tabIndex={0}
          aria-label="Sağdaki Fotoğrafı Büyüt"
        >
          <img
            src={photoMap[slots.right].src}
            alt={photoMap[slots.right].alt}
            className="deck-photo"
          />
        </div>

        {/* Side Tap Targets overlaying the 20% visible wings */}
        {phase === 'landed' && (
          <>
            <button
              type="button"
              className="side-tap-target tap-left"
              onClick={handleLeftClick}
              aria-label="Soldaki Fotoğrafı Büyüt"
            />
            <button
              type="button"
              className="side-tap-target tap-right"
              onClick={handleRightClick}
              aria-label="Sağdaki Fotoğrafı Büyüt"
            />
          </>
        )}
      </div>

      {/* Birthday text appears when landed and stays neatly separated below */}
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
