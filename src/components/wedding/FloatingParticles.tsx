export function FloatingParticles() {
  return (
    <div className="particles" aria-hidden="true">
      {Array.from({ length: 18 }, (_, i) => (
        <i
          key={i}
          style={{
            left: `${(i * 37 + 7) % 100}%`,
            top: `${(i * 23) % 100}%`,
            animationDelay: `${-i * 1.7}s`,
            animationDuration: `${12 + (i % 6)}s`,
          }}
        />
      ))}
    </div>
  );
}
