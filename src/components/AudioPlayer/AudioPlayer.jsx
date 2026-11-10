import { useState, useEffect, useRef } from 'react';

const BASE = import.meta.env.BASE_URL;

export const SEASON_TRACKS = {
  autumn: {
    id: 'autumn',
    title: 'Cozy Autumn Playlist',
    tag: 'Autumn Vibe',
    icon: '🍂',
    file: 'autumn.m4a'
  },
  winter: {
    id: 'winter',
    title: 'Winter Songs & Vibe',
    tag: 'Winter Vibe',
    icon: '❄️',
    file: 'winter.m4a'
  },
  spring: {
    id: 'spring',
    title: 'Spring Bloom Playlist',
    tag: 'Spring Vibe',
    icon: '🌷',
    file: 'spring.m4a'
  },
  summer: {
    id: 'summer',
    title: 'Finally Summer Playlist',
    tag: 'Summer Vibe',
    icon: '☀️',
    file: 'summer.m4a'
  }
};

function VolumeIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

function VolumeMuteIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

export default function AudioPlayer({ season = 'autumn' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolume, setShowVolume] = useState(false);

  const audioRef = useRef(null);
  const containerRef = useRef(null);
  const userManuallyPausedRef = useRef(false);
  const isPlayingRef = useRef(false);
  const hoverTimerRef = useRef(null);
  const prevSrcRef = useRef(null);

  isPlayingRef.current = isPlaying;

  const safeSeason = SEASON_TRACKS[season] ? season : 'autumn';
  const track = SEASON_TRACKS[safeSeason];
  const audioSrc = `${BASE}audio/${track.file}`;

  // Helper to reliably start playback
  const startAudioPlayback = (targetVol = volume) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = isMuted ? 0 : targetVol;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Playback pending user interaction:', err?.message || err);
        });
    }
  };

  // 1. Auto-play on first real user interaction (click, touch, key, scroll)
  useEffect(() => {
    let active = true;

    const handleInteraction = () => {
      if (!active || userManuallyPausedRef.current || isPlayingRef.current) return;
      const audio = audioRef.current;
      if (!audio) return;

      audio.volume = isMuted ? 0 : volume;
      const promise = audio.play();
      if (promise !== undefined) {
        promise
          .then(() => {
            active = false;
            setIsPlaying(true);
            detachAll();
          })
          .catch(() => {
            // Browser blocked (e.g. scroll without prior click)
            // Keep listeners alive so the next click/tap plays!
          });
      }
    };

    const detachAll = () => {
      document.removeEventListener('click', handleInteraction, true);
      document.removeEventListener('pointerdown', handleInteraction, true);
      document.removeEventListener('touchstart', handleInteraction, true);
      document.removeEventListener('keydown', handleInteraction, true);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('wheel', handleInteraction);
    };

    // Capture phase ensures we catch clicks even if elements stop propagation
    document.addEventListener('click', handleInteraction, true);
    document.addEventListener('pointerdown', handleInteraction, true);
    document.addEventListener('touchstart', handleInteraction, true);
    document.addEventListener('keydown', handleInteraction, true);
    window.addEventListener('scroll', handleInteraction, { passive: true });
    window.addEventListener('wheel', handleInteraction, { passive: true });

    return () => {
      active = false;
      detachAll();
    };
  }, [volume, isMuted]);

  // 2. When season changes, update audio src smoothly
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Only switch if src actually changed to prevent aborting initial load
    if (prevSrcRef.current !== audioSrc) {
      const wasPlaying = isPlayingRef.current;
      prevSrcRef.current = audioSrc;
      audio.src = audioSrc;
      audio.load();

      if (wasPlaying && !userManuallyPausedRef.current) {
        startAudioPlayback(volume);
      }
    }
  }, [audioSrc, volume]);

  // 3. Sync volume changes to audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // 4. Click outside listener to close volume popover
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowVolume(false);
      }
    };
    document.addEventListener('pointerdown', handleClickOutside);
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setShowVolume(true);
  };

  const handleMouseLeave = () => {
    hoverTimerRef.current = setTimeout(() => {
      setShowVolume(false);
    }, 350);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      userManuallyPausedRef.current = true;
      audio.pause();
      setIsPlaying(false);
    } else {
      userManuallyPausedRef.current = false;
      startAudioPlayback(volume);
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val === 0) setIsMuted(true);
    else if (isMuted) setIsMuted(false);
  };

  const decreaseVolume = (e) => {
    e.stopPropagation();
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setVolume((prev) => {
      const next = Math.max(0, Math.round((prev - 0.1) * 100) / 100);
      if (next === 0) setIsMuted(true);
      return next;
    });
    if (isMuted) setIsMuted(false);
  };

  const increaseVolume = (e) => {
    e.stopPropagation();
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setIsMuted(false);
    setVolume((prev) => Math.min(1, Math.round((prev + 0.1) * 100) / 100));
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setIsMuted((prev) => !prev);
  };

  const effectiveVolumePct = Math.round((isMuted ? 0 : volume) * 100);

  return (
    <div
      ref={containerRef}
      className="bgm-player"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Clean Single Pill */}
      <button
        type="button"
        className={`bgm-btn ${isPlaying ? 'is-playing' : ''}`}
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
        title={`${isPlaying ? 'Pause' : 'Play'} BGM: ${track.title} (Arahkan kursor untuk atur volume)`}
      >
        <span className="bgm-icon">
          {isPlaying ? (
            <span className="bgm-equalizer">
              <span className="eq-bar eq-bar-1" />
              <span className="eq-bar eq-bar-2" />
              <span className="eq-bar eq-bar-3" />
              <span className="eq-bar eq-bar-4" />
            </span>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </span>

        <span className="bgm-label">
          {isPlaying ? (
            <span className="bgm-text-ticker">{track.tag}</span>
          ) : (
            <span>BGM</span>
          )}
        </span>
      </button>

      {/* Volume Popover with Hover-Bridge */}
      {showVolume && (
        <div
          className="bgm-popover"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bgm-popover-info">
            <span className="bgm-popover-title">{track.title}</span>
            <button
              type="button"
              className="bgm-mute-btn"
              onClick={toggleMute}
              title={isMuted ? 'Unmute' : 'Mute'}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? <VolumeMuteIcon /> : <VolumeIcon />}
            </button>
          </div>

          {/* Volume Stepper: [ - ]  ====O====  [ + ]  35% */}
          <div className="bgm-vol-row">
            <button
              type="button"
              className="bgm-step-btn"
              onClick={decreaseVolume}
              title="Kecilkan Volume (-10%)"
              aria-label="Volume Down"
            >
              −
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="bgm-slider"
              aria-label="Volume BGM"
            />

            <button
              type="button"
              className="bgm-step-btn"
              onClick={increaseVolume}
              title="Besarkan Volume (+10%)"
              aria-label="Volume Up"
            >
              +
            </button>

            <span className="bgm-pct-badge">{effectiveVolumePct}%</span>
          </div>
        </div>
      )}
    </div>
  );
}
