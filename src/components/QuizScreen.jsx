import React, { useState } from 'react';
import { QUIZ_STAGES } from '../data/quizData';
import { audioManager } from '../utils/audio';
import { triggerQuizConfetti } from '../utils/confetti';

export const QuizScreen = ({ onQuizComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedKey, setSelectedKey] = useState(null);
  const [status, setStatus] = useState(null); // 'correct' | 'wrong' | null
  const [isLocked, setIsLocked] = useState(false);
  const [shake, setShake] = useState(false);

  const currentStage = QUIZ_STAGES[currentIdx];

  // Handler for custom transition step (Aşama 3)
  const handleTransitionNext = () => {
    if (isLocked) return;
    audioManager.initContext();
    audioManager.playClick();
    setIsLocked(true);
    setTimeout(() => {
      setCurrentIdx(prev => prev + 1);
      setIsLocked(false);
    }, 250);
  };

  // Handler for normal questions
  const handleSelect = (key) => {
    if (isLocked) return;

    audioManager.initContext();
    setSelectedKey(key);

    const isCorrect = key === currentStage.correctKey;

    if (isCorrect) {
      setIsLocked(true);
      setStatus('correct');
      audioManager.playSuccess();
      triggerQuizConfetti();

      // For question 7 (Ayran), wait longer to let the special message be read
      const isAyranQuestion = currentStage.stepNumber === 7;
      const delay = isAyranQuestion ? 2400 : 1350;

      setTimeout(() => {
        if (currentIdx + 1 < QUIZ_STAGES.length) {
          setCurrentIdx(prev => prev + 1);
          setSelectedKey(null);
          setStatus(null);
          setIsLocked(false);
        } else {
          onQuizComplete();
        }
      }, delay);
    } else {
      // Wrong answer
      setStatus('wrong');
      audioManager.playError();
      setShake(true);

      setTimeout(() => {
        setShake(false);
      }, 450);

      // Re-enable option selection on same question after brief feedback
      setTimeout(() => {
        setStatus(null);
        setSelectedKey(null);
      }, 1000);
    }
  };

  return (
    <div className={`screen-wrapper ${shake ? 'shake-screen' : ''}`}>
      <div className="quiz-container">
        {/* Progress & Badge */}
        <div className="quiz-header">
          <span className="quiz-badge">AŞAMA {currentStage.stepNumber} / {QUIZ_STAGES.length}</span>
          <div className="quiz-progress-dots">
            {QUIZ_STAGES.map((_, i) => (
              <div
                key={i}
                className={`progress-dot ${
                  i < currentIdx
                    ? 'completed'
                    : i === currentIdx
                    ? 'active'
                    : ''
                }`}
              />
            ))}
          </div>
        </div>

        {/* 3. AŞAMA: ÖZEL GEÇİŞ */}
        {currentStage.type === 'custom_transition' ? (
          <div className="question-card special-transition-card">
            <h2 className="special-transition-message">
              {currentStage.message}
            </h2>
            <div className="action-btn-container" style={{ marginTop: '24px' }}>
              <button
                type="button"
                className="cyber-button"
                disabled={isLocked}
                onClick={handleTransitionNext}
              >
                {currentStage.buttonText}
              </button>
            </div>
          </div>
        ) : (
          /* NORMAL SORU KARTI */
          <div className="question-card">
            {/* Optional Intro Text (e.g. 4. Soru) */}
            {currentStage.introText && (
              <div className="question-intro-banner">
                {currentStage.introText}
              </div>
            )}

            <h2 className="question-title">
              {currentStage.title}: {currentStage.question}
            </h2>

            {/* Optional Sub-question (e.g. 8. Soru - Azra) */}
            {currentStage.subQuestion && (
              <p className="question-subtext">
                {currentStage.subQuestion}
              </p>
            )}

            <div className="options-list">
              {currentStage.options.map((opt) => {
                const isSelected = selectedKey === opt.key;
                let stateClass = '';

                if (isSelected && status === 'correct') {
                  stateClass = 'correct';
                } else if (isSelected && status === 'wrong') {
                  stateClass = 'wrong';
                }

                return (
                  <button
                    key={opt.key}
                    type="button"
                    disabled={isLocked}
                    className={`option-btn ${stateClass}`}
                    onClick={() => handleSelect(opt.key)}
                  >
                    <span className="option-letter">{opt.key}</span>
                    <span className="option-text">{opt.text}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Dynamic feedback messages for questions */}
        {currentStage.type === 'question' && (
          <div className="feedback-box">
            {status === 'correct' && (
              <>
                <div className="feedback-msg msg-success">
                  Helal lan MetoSandal
                </div>
                {currentStage.specialMessage && (
                  <div className="special-msg">
                    {currentStage.specialMessage}
                  </div>
                )}
              </>
            )}

            {status === 'wrong' && (
              <div className="feedback-msg msg-error">
                Hadi amaaaaa zor olmamalı Meto
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
