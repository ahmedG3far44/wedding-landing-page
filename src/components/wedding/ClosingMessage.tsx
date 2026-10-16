import { useInvitation } from "../../hooks/useInvitation";
import { Ornament } from "../ui/Ornament";
export function ClosingMessage() {
  const { content: c } = useInvitation();
  return (
    <>
      <section className="section closing scroll-reveal">
        <Ornament />
        <p>{c.invitation.closingText}</p>
        <div className="closing-names">
          {c.couple.groomName}
          <span> و </span>
          {c.couple.brideName}
        </div>
        <span className="small-star" aria-hidden="true">
          ✧
        </span>
      </section>
      <footer>
        <p>{c.footer.message}</p>
        <span>{c.wedding.displayDate}</span>
      </footer>
    </>
  );
}
