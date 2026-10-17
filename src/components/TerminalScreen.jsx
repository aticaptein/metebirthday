import React, { useState, useEffect } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';
import { audioManager } from '../utils/audio';

export const TerminalScreen = ({ onOpen }) => {
  const terminalLines = [
    "Sistem taranıyor...",
    "Önemli bir dosya bulundu.",
    "Kullanıcı tespit edildi: Metehan Sandal",
    "Dosya erişime hazır."
  ];

  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (currentLineIndex < terminalLines.length) {
      const fullLine = terminalLines[currentLineIndex];

      if (currentCharIndex < fullLine.length) {
        const timeout = setTimeout(() => {
          setDisplayedLines(prev => {
            const next = [...prev];
            if (!next[currentLineIndex]) {
              next[currentLineIndex] = '';
            }
            next[currentLineIndex] = fullLine.slice(0, currentCharIndex + 1);
            return next;
          });
          setCurrentCharIndex(prev => prev + 1);
          audioManager.playTypingSound();
        }, 42);

        return () => clearTimeout(timeout);
      } else {
        // Line finished, short pause before next line
        const linePause = setTimeout(() => {
          setCurrentLineIndex(prev => prev + 1);
          setCurrentCharIndex(0);
        }, 340);

        return () => clearTimeout(linePause);
      }
    } else {
      // All lines printed, show button
      const btnTimer = setTimeout(() => {
        setShowButton(true);
      }, 250);
      return () => clearTimeout(btnTimer);
    }
  }, [currentLineIndex, currentCharIndex]);

  const handleOpenClick = () => {
    audioManager.initContext();
    audioManager.playClick();
    audioManager.startAmbient();
    onOpen();
  };

  return (
    <div className="screen-wrapper">
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-dot dot-red"></div>
          <div className="terminal-dot dot-yellow"></div>
          <div className="terminal-dot dot-green"></div>
          <div className="terminal-title">METEHAN.EXE v19.0 // SECURE TERMINAL</div>
        </div>

        <div className="terminal-body">
          <div className="terminal-logs">
            {displayedLines.map((line, idx) => {
              const isUserLine = idx === 2;
              const isReadyLine = idx === 3;
              return (
                <div key={idx} className="log-item">
                  <span className="log-prompt">&gt;</span>
                  <span
                    className={
                      isUserLine
                        ? 'log-text-user'
                        : isReadyLine
                        ? 'log-text-ready'
                        : ''
                    }
                  >
                    {line}
                  </span>
                </div>
              );
            })}

            {!showButton && (
              <div className="log-item">
                <span className="log-prompt">&gt;</span>
                <span className="cursor-blink"></span>
              </div>
            )}
          </div>

          {showButton && (
            <div className="action-btn-container">
              <button
                type="button"
                className="cyber-button"
                onClick={handleOpenClick}
              >
                DOSYAYI AÇ
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
