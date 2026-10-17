import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { TerminalScreen } from './components/TerminalScreen';
import { QuizScreen } from './components/QuizScreen';
import { SurpriseEscapeScreen } from './components/SurpriseEscapeScreen';
import { FinaleScreen } from './components/FinaleScreen';
import { audioManager } from './utils/audio';

export function App() {
  // Stages: 'terminal' -> 'quiz' -> 'transition' -> 'surprise' -> 'finale'
  const [currentStage, setCurrentStage] = useState('terminal');
  const [isMuted, setIsMuted] = useState(false);

  const toggleSound = () => {
    const muted = audioManager.toggleMute();
    setIsMuted(muted);
  };

  const handleStartQuiz = () => {
    setCurrentStage('quiz');
  };

  const handleQuizFinished = () => {
    setCurrentStage('transition');
  };

  const handleSurpriseFinished = () => {
    setCurrentStage('finale');
  };

  useEffect(() => {
    if (currentStage === 'transition') {
      const timer = setTimeout(() => {
        setCurrentStage('surprise');
      }, 2600);
      return () => clearTimeout(timer);
    }
  }, [currentStage]);

  return (
    <div className="app-container">
      {/* Ambient background glows & grid */}
      <div className="ambient-glow-1"></div>
      <div className="ambient-glow-2"></div>
      <div className="cyber-grid"></div>

      {/* Discrete Audio toggle button */}
      <button
        type="button"
        className="audio-toggle-btn"
        onClick={toggleSound}
        aria-label="Ses Aç/Kapat"
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>

      {/* 1. Terminal Screen */}
      {currentStage === 'terminal' && (
        <TerminalScreen onOpen={handleStartQuiz} />
      )}

      {/* 2. Friendship Quiz Screen (7 questions + 1 special transition) */}
      {currentStage === 'quiz' && (
        <QuizScreen onQuizComplete={handleQuizFinished} />
      )}

      {/* 3. Finale Transition Screen */}
      {currentStage === 'transition' && (
        <div className="transition-screen">
          <h1 className="transition-text">
            Eveeeeet, şimdi asıl kısma geliyoruz...
          </h1>
        </div>
      )}

      {/* 4. Escaping Surprise Button Arena */}
      {currentStage === 'surprise' && (
        <SurpriseEscapeScreen onFinish={handleSurpriseFinished} />
      )}

      {/* 5. Photo Birthday Finale Screen */}
      {currentStage === 'finale' && (
        <FinaleScreen />
      )}
    </div>
  );
}

export default App;
