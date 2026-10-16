import { z } from "zod";
const text = z
  .string()
  .trim()
  .min(1, "هذا الحقل مطلوب")
  .max(2000, "النص طويل جداً");
const url = z
  .string()
  .refine(
    (v) => !v || (/^https:\/\//i.test(v) && URL.canParse(v)),
    "أدخل رابط HTTPS صحيحاً",
  );
export const invitationSchema = z.object({
  site: z.object({
    title: text,
    description: text,
    language: z.enum(["ar", "en"]),
    direction: z.enum(["rtl", "ltr"]),
  }),
  couple: z.object({ groomName: text, brideName: text }),
  invitation: z.object({
    bismillah: text,
    introText: text,
    mainText: text,
    attendanceText: text,
    closingText: text,
  }),
  wedding: z.object({
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "اختر تاريخاً صحيحاً")
      .refine((v) => {
        const d = new Date(v);
        return !isNaN(+d) && d.toISOString().startsWith(v);
      }, "تاريخ غير صالح"),
    time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "اختر وقتاً صحيحاً"),
    timezone: text.refine((v) => {
      try {
        new Intl.DateTimeFormat("en", { timeZone: v });
        return true;
      } catch {
        return false;
      }
    }, "منطقة زمنية غير صالحة"),
    displayDate: text,
    displayTime: text,
  }),
  location: z.object({
    venueName: text,
    address: text,
    googleMapsUrl: url,
    mapEmbedUrl: url.refine((v) => {
      if (!v) return true;
      try {
        const u = new URL(v);
        return (
          (u.hostname === "www.google.com" ||
            u.hostname === "maps.google.com") &&
          u.pathname.startsWith("/maps")
        );
      } catch {
        return false;
      }
    }, "استخدم رابط تضمين خرائط Google"),
  }),
  countdown: z.object({
    enabled: z.boolean(),
    title: text,
    completedMessage: text,
  }),
  footer: z.object({ message: text }),
});
export type InvitationContent = z.infer<typeof invitationSchema>;
