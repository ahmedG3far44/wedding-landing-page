export function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`ornament ${className}`} aria-hidden="true">
      <span />✧<i>❦</i>✧<span />
    </div>
  );
}
