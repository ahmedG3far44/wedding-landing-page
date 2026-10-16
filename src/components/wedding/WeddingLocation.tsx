import { ArrowUpLeft, MapPin } from "lucide-react";
import { useInvitation } from "../../hooks/useInvitation";
import { Ornament } from "../ui/Ornament";
export function WeddingLocation() {
  const { content: c } = useInvitation();
  const url =
    c.location.googleMapsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${c.location.venueName} ${c.location.address}`)}`;
  return (
    <section className="section location scroll-reveal" id="location">
      <div className="venue-art" aria-hidden="true">
        <div className="arch">
          <div className="arch-inner">
            <span>❦</span>
            <MapPin size={36} strokeWidth={1} />
            <div className="art-lines" />
          </div>
        </div>
        <span className="venue-art-caption">هنا تبدأ حكايتنا</span>
      </div>
      <div className="location-copy">
        <p className="eyebrow">في انتظاركم</p>
        <h2>{c.location.venueName}</h2>
        <Ornament />
        <p>{c.location.address}</p>
        <p className="location-note">{c.invitation.attendanceText}</p>
        <a className="button" href={url} target="_blank" rel="noreferrer">
          <MapPin size={17} />
          الموقع والاتجاهات
          <ArrowUpLeft size={16} />
        </a>
      </div>
      {c.location.mapEmbedUrl && (
        <iframe
          className="map"
          src={c.location.mapEmbedUrl}
          title={c.location.venueName}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      )}
    </section>
  );
}
