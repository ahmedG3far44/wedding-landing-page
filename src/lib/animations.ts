import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export function animateInvitation(root: HTMLElement) {
  const mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const ctx = gsap.context(() => {
      gsap.from(".invitation-card", {
        y: 24,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
      });
      gsap.from(".reveal, .name", {
        y: 12,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        delay: 0.3,
      });
      gsap.utils
        .toArray<HTMLElement>(".scroll-reveal")
        .forEach((el) =>
          gsap.from(el, {
            y: 28,
            opacity: 0,
            duration: 0.9,
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          }),
        );
    }, root);
    return () => ctx.revert();
  });
  return () => mm.revert();
}
