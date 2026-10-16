import { useEffect, useRef } from "react";
import { InvitationHero } from "../components/wedding/InvitationHero";
import { WeddingDetails } from "../components/wedding/WeddingDetails";
import { WeddingCountdown } from "../components/wedding/WeddingCountdown";
import { WeddingLocation } from "../components/wedding/WeddingLocation";
import { ClosingMessage } from "../components/wedding/ClosingMessage";
import { FloatingParticles } from "../components/wedding/FloatingParticles";
import { animateInvitation } from "../lib/animations";
import { BackgroundAudio } from "../components/wedding/BackgroundAudio";
export function InvitationPage() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (root.current) return animateInvitation(root.current);
  }, []);
  return (
    <main ref={root} className="invitation-page">
      <FloatingParticles />
      <InvitationHero />
      <WeddingDetails />
      <WeddingCountdown />
      <WeddingLocation />
      <ClosingMessage />
      <BackgroundAudio />
    </main>
  );
}
