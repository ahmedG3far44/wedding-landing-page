import { ArrowDown } from "lucide-react";
import { useInvitation } from "../../hooks/useInvitation";
import { Ornament } from "../ui/Ornament";
export function InvitationHero() {
  const { content: c } = useInvitation();
  return (
    <section className="hero" id="invitation">
      <div className="hero-caption">
        <span />
        {c.site.title}
        <span />
      </div>
      <div className="invitation-card">
        <div className="card-inner">
          <div className="corner top-right" />
          <div className="corner top-left" />
          <div className="corner bottom-right" />
          <div className="corner bottom-left" />
          <p className="bismillah reveal">{c.invitation.bismillah}</p>
          <Ornament />
          <p className="intro reveal">{c.invitation.introText}</p>
          <p className="main-text reveal">{c.invitation.mainText}</p>
          <h1 className="couple">
            <span className="name">{c.couple.groomName}</span>
            <span className="ampersand">و</span>
            <span className="name">{c.couple.brideName}</span>
          </h1>
          <p className="attendance reveal">{c.invitation.attendanceText}</p>
          <Ornament />
          <p className="hero-date reveal">{c.wedding.displayDate}</p>
          <p className="hero-venue reveal">
            {c.location.venueName} <span>·</span> {c.location.address}
          </p>
        </div>
      </div>
      <a className="scroll-link" href="#details">
        <span>تفاصيل ليلة العمر</span>
        <ArrowDown size={16} />
      </a>
    </section>
  );
}
