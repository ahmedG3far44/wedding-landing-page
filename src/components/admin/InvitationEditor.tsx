import { useEffect } from "react";
import { useForm, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { useInvitation } from "../../hooks/useInvitation";
import { defaultContent } from "../../lib/storage";
import { posthog, posthogLogger } from "../../lib/posthog";
import {
  invitationSchema,
  type InvitationContent,
} from "../../types/invitation.types";
type Field = {
  name: FieldPath<InvitationContent>;
  label: string;
  type?: string;
};
const sections: { id: string; title: string; fields: Field[] }[] = [
  {
    id: "couple",
    title: "العروسان",
    fields: [
      { name: "couple.groomName", label: "اسم العريس" },
      { name: "couple.brideName", label: "اسم العروس" },
    ],
  },
  {
    id: "invitation",
    title: "نصوص الدعوة",
    fields: [
      { name: "invitation.bismillah", label: "البسملة" },
      { name: "invitation.introText", label: "المقدمة" },
      { name: "invitation.mainText", label: "نص الدعوة", type: "textarea" },
      { name: "invitation.attendanceText", label: "عبارة الحضور" },
      {
        name: "invitation.closingText",
        label: "رسالة الختام",
        type: "textarea",
      },
    ],
  },
  {
    id: "wedding",
    title: "موعد الزفاف",
    fields: [
      { name: "wedding.date", label: "التاريخ", type: "date" },
      { name: "wedding.time", label: "الوقت", type: "time" },
      { name: "wedding.timezone", label: "المنطقة الزمنية (مثل Africa/Cairo)" },
      { name: "wedding.displayDate", label: "التاريخ المعروض" },
      { name: "wedding.displayTime", label: "الوقت المعروض" },
    ],
  },
  {
    id: "location",
    title: "المكان والاتجاهات",
    fields: [
      { name: "location.venueName", label: "اسم القاعة" },
      { name: "location.address", label: "العنوان" },
      {
        name: "location.googleMapsUrl",
        label: "رابط خرائط Google (اختياري)",
        type: "url",
      },
      {
        name: "location.mapEmbedUrl",
        label: "رابط تضمين خرائط Google (اختياري)",
        type: "url",
      },
    ],
  },
  {
    id: "countdown",
    title: "العد التنازلي",
    fields: [
      { name: "countdown.title", label: "العنوان" },
      { name: "countdown.completedMessage", label: "الرسالة عند حلول الموعد" },
    ],
  },
  {
    id: "site",
    title: "معلومات الموقع",
    fields: [
      { name: "site.title", label: "عنوان الصفحة" },
      { name: "site.description", label: "وصف الصفحة", type: "textarea" },
      { name: "footer.message", label: "رسالة التذييل" },
    ],
  },
];
export function InvitationEditor() {
  const { content, save, reset: resetContent } = useInvitation();
  const { register, handleSubmit, reset, getFieldState, formState } =
    useForm<InvitationContent>({
      resolver: zodResolver(invitationSchema),
      defaultValues: content,
    });
  const { isDirty, isSubmitting } = formState;
  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (isDirty) e.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [isDirty]);
  return (
    <form
      className="editor-layout"
      noValidate
      onSubmit={handleSubmit(
        (v) => {
          try {
            save(v);
            reset(v);
            posthog?.capture("invitation_content_saved");
            posthogLogger.info("invitation configuration saved", {
              operation: "save",
              storage: "local_storage",
            });
            toast.success("تم حفظ التعديلات بنجاح");
          } catch {
            posthog?.capture("invitation_content_save_failed");
            posthogLogger.error("invitation configuration storage failed", {
              operation: "save",
              storage: "local_storage",
            });
            toast.error("تعذر الحفظ. تحقق من مساحة التخزين وإعدادات المتصفح.");
          }
        },
        () => toast.error("راجع الحقول المحددة قبل الحفظ"),
      )}
    >
      <aside className="editor-nav">
        <p>محتويات الدعوة</p>
        {sections.map((s, i) => (
          <a href={`#edit-${s.id}`} key={s.id}>
            <span>0{i + 1}</span>
            {s.title}
          </a>
        ))}
        <div className={`save-status ${isDirty ? "dirty" : ""}`}>
          {isDirty ? "● تغييرات غير محفوظة" : "✓ جميع التغييرات محفوظة"}
        </div>
      </aside>
      <div className="editor-fields">
        {sections.map((s, i) => (
          <section id={`edit-${s.id}`} className="editor-section" key={s.id}>
            <h2>
              <span>0{i + 1}</span>
              {s.title}
            </h2>
            <div className="form-grid">
              {s.id === "countdown" && (
                <label className="checkbox-label">
                  <input type="checkbox" {...register("countdown.enabled")} />
                  إظهار العد التنازلي
                </label>
              )}
              {s.fields.map((f) => {
                const error = getFieldState(f.name, formState).error;
                return (
                  <label
                    className={f.type === "textarea" ? "wide" : ""}
                    key={f.name}
                  >
                    {f.label}
                    {f.type === "textarea" ? (
                      <textarea
                        rows={3}
                        {...register(f.name)}
                        aria-invalid={!!error}
                      />
                    ) : (
                      <input
                        type={f.type || "text"}
                        {...register(f.name)}
                        aria-invalid={!!error}
                        dir={
                          ["url", "date", "time"].includes(f.type || "") ||
                          f.name === "wedding.timezone"
                            ? "ltr"
                            : undefined
                        }
                      />
                    )}
                    {error && (
                      <small role="alert">{String(error.message)}</small>
                    )}
                  </label>
                );
              })}
              {s.id === "site" && (
                <>
                  <label>
                    لغة الصفحة
                    <select {...register("site.language")}>
                      <option value="ar">العربية</option>
                      <option value="en">English</option>
                    </select>
                  </label>
                  <label>
                    اتجاه الصفحة
                    <select {...register("site.direction")}>
                      <option value="rtl">من اليمين إلى اليسار</option>
                      <option value="ltr">من اليسار إلى اليمين</option>
                    </select>
                  </label>
                </>
              )}
            </div>
          </section>
        ))}
        <div className="editor-actions">
          <button className="button" disabled={isSubmitting} type="submit">
            <Save size={17} />
            حفظ التغييرات
          </button>
          <button
            className="button secondary"
            type="button"
            onClick={() => {
              if (
                window.confirm(
                  "هل تريد استعادة المحتوى الافتراضي؟ ستُحذف جميع التعديلات المحفوظة.",
                )
              ) {
                try {
                  resetContent();
                  reset(defaultContent);
                  posthog?.capture("invitation_content_reset");
                  posthogLogger.info("invitation configuration reset", {
                    operation: "reset",
                    storage: "local_storage",
                  });
                  toast.success("تمت استعادة الإعدادات الافتراضية");
                } catch {
                  posthogLogger.error("invitation configuration storage failed", {
                    operation: "reset",
                    storage: "local_storage",
                  });
                  toast.error("تعذر الوصول إلى التخزين");
                }
              }
            }}
          >
            <RotateCcw size={16} />
            استعادة الافتراضي
          </button>
        </div>
      </div>
    </form>
  );
}
