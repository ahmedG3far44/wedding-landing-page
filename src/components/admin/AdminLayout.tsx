import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Eye, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { posthog } from "../../lib/posthog";
export function AdminLayout({ children }: { children: ReactNode }) {
  const { logout } = useAuth();
  return (
    <main className="admin-page" dir="rtl">
      <header className="admin-header">
        <div>
          <span className="eyebrow">تفاصيل تُكتب بالحب</span>
          <h1>إدارة دعوة الزفاف</h1>
        </div>
        <div className="header-actions">
          <Link className="button secondary" to="/">
            <Eye size={17} />
            معاينة الدعوة
          </Link>
          <button
            className="icon-button"
            onClick={() => {
              posthog?.capture("admin_logged_out");
              logout();
            }}
            aria-label="تسجيل الخروج"
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>
      <p className="storage-note">
        تُحفظ التعديلات في هذا المتصفح فقط. تسجيل الدخول بوابة بسيطة للإدارة،
        وليس حماية أمنية.
      </p>
      {children}
    </main>
  );
}
