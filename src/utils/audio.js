// Centralized background music manager for Sagopa Kajmer - Muamma (00:20 - 01:10 loop)

class AudioManager {
  constructor() {
    this.bgAudio = null;
    this.isMuted = false;
    this.hasUserStarted = false;
    this.LOOP_START = 20.0;
    this.LOOP_END = 70.0; // 01:10 (70 seconds)
    this.DEFAULT_VOLUME = 0.45;
  }

  init() {
    if (this.bgAudio) return;

    // Use Vite's BASE_URL so it works on both localhost and GitHub Pages (/metebirthday/)
    const baseUrl = import.meta.env.BASE_URL || '/';
    const audioSrc = `${baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'}muamma.mp3`;

    this.bgAudio = new Audio(audioSrc);
    this.bgAudio.preload = 'auto';
    this.bgAudio.volume = this.DEFAULT_VOLUME;
    this.bgAudio.currentTime = this.LOOP_START;

    // Time update listener to enforce 00:20 to 01:10 loop seamlessly
    this.bgAudio.addEventListener('timeupdate', () => {
      if (this.bgAudio && this.bgAudio.currentTime >= this.LOOP_END) {
        this.bgAudio.currentTime = this.LOOP_START;
      }
    });

    // In case seeked or loop ended
    this.bgAudio.addEventListener('ended', () => {
      if (this.bgAudio) {
        this.bgAudio.currentTime = this.LOOP_START;
        this.bgAudio.play().catch(() => {});
      }
    });
  }

  // Attempt to play on startup or upon user interaction
  startMusic() {
    this.init();
    if (!this.bgAudio) return;
    this.hasUserStarted = true;

    if (this.bgAudio.currentTime < this.LOOP_START || this.bgAudio.currentTime >= this.LOOP_END) {
      this.bgAudio.currentTime = this.LOOP_START;
    }

    if (!this.isMuted) {
      this.bgAudio.play().catch(() => {
        // Autoplay policy prevented; will play on user interaction
      });
    }
  }

  toggleMute() {
    this.init();
    this.isMuted = !this.isMuted;
    if (this.bgAudio) {
      this.bgAudio.muted = this.isMuted;
      if (!this.isMuted && this.bgAudio.paused) {
        this.bgAudio.play().catch(() => {});
      }
    }
    return this.isMuted;
  }

  // Legacy no-op stubs to eliminate old sfx cleanly
  initContext() {}
  playTypingSound() {}
  playClick() {}
  playSuccess() {}
  playError() {}
  playFinaleChord() {}
  startAmbient() {}
}

export const audioManager = new AudioManager();
