import { CalendarDays, Clock3, MapPin } from "lucide-react";
import { useInvitation } from "../../hooks/useInvitation";
import { Ornament } from "../ui/Ornament";
export function WeddingDetails() {
  const { content: c } = useInvitation();
  return (
    <section id="details" className="section details scroll-reveal">
      <p className="eyebrow">موعد يجمعنا بالحب</p>
      <h2>تفاصيل ليلة العمر</h2>
      <Ornament />
      <div className="detail-grid">
        {[
          {
            Icon: CalendarDays,
            label: "التاريخ",
            value: c.wedding.displayDate,
          },
          { Icon: Clock3, label: "الوقت", value: c.wedding.displayTime },
          {
            Icon: MapPin,
            label: "المكان",
            value: c.location.venueName,
            sub: c.location.address,
          },
        ].map(({ Icon, label, value, sub }) => (
          <article className="detail-item" key={label}>
            <Icon size={26} strokeWidth={1} />
            <p className="detail-label">{label}</p>
            <h3>{value}</h3>
            {sub && <p>{sub}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}
