import { useEffect, useState } from "react";
import { fromZonedTime } from "date-fns-tz";
import { useInvitation } from "../../hooks/useInvitation";
export function WeddingCountdown() {
  const { content: c } = useInvitation();
  const [now, setNow] = useState(Date.now);
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  if (!c.countdown.enabled) return null;
  const seconds = Math.max(
    0,
    Math.floor(
      (+fromZonedTime(
        `${c.wedding.date}T${c.wedding.time}:00`,
        c.wedding.timezone,
      ) -
        now) /
        1000,
    ),
  );
  const values = [
    Math.floor(seconds / 86400),
    Math.floor(seconds / 3600) % 24,
    Math.floor(seconds / 60) % 60,
    seconds % 60,
  ];
  return (
    <section className="countdown-section scroll-reveal">
      <div className="section">
        <p className="eyebrow">كل لحظة تقرّبنا</p>
        <h2>{c.countdown.title}</h2>
        {seconds > 0 ? (
          <div
            className="countdown"
            role="timer"
            aria-label={c.countdown.title}
          >
            {values.map((value, i) => (
              <div key={i}>
                <strong>{String(value).padStart(2, "0")}</strong>
                <span>{["يوم", "ساعة", "دقيقة", "ثانية"][i]}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="completed">{c.countdown.completedMessage}</p>
        )}
      </div>
    </section>
  );
}
