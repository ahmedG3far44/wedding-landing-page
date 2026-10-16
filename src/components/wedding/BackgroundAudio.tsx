import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { posthog } from "../../lib/posthog";

export function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.35;
    const start = () => {
      if (!userPaused.current && audio.paused) {
        void audio.play().catch(() => {
          // Audible autoplay may require a user gesture.
        });
      }
    };
    const onInteraction = (event: Event) => {
      if (event.target instanceof Element && event.target.closest(".audio-toggle")) return;
      start();
    };
    start();
    document.addEventListener("click", onInteraction);
    document.addEventListener("keydown", onInteraction);
    return () => {
      document.removeEventListener("click", onInteraction);
      document.removeEventListener("keydown", onInteraction);
      audio.pause();
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      posthog?.capture("background_audio_toggled", { action: "paused" });
      userPaused.current = true;
      audio.pause();
    } else {
      posthog?.capture("background_audio_toggled", { action: "played" });
      userPaused.current = false;
      void audio.play().catch(() => setPlaying(false));
    }
  };

  const label = playing ? "إيقاف الموسيقى" : "تشغيل الموسيقى";
  return (
    <>
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}audio.mp3`}
        autoPlay
        loop
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setPlaying(false)}
      />
      <button
        type="button"
        className="audio-toggle"
        onClick={toggle}
        aria-label={label}
        title={label}
        aria-pressed={playing}
      >
        {playing ? <Volume2 size={21} strokeWidth={1.5} /> : <VolumeX size={21} strokeWidth={1.5} />}
      </button>
    </>
  );
}
