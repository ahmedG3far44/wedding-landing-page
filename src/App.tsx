import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/AuthContext";
import { InvitationProvider } from "./context/InvitationContext";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";
import { InvitationPage } from "./pages/InvitationPage";
import { lazy, Suspense } from "react";
const AdminLoginPage = lazy(() =>
  import("./pages/AdminLoginPage").then((m) => ({ default: m.AdminLoginPage })),
);
const AdminDashboardPage = lazy(() =>
  import("./pages/AdminDashboardPage").then((m) => ({
    default: m.AdminDashboardPage,
  })),
);
export default function App() {
  return (
    <BrowserRouter>
      <InvitationProvider>
        <AuthProvider>
          <Suspense
            fallback={
              <div className="loading-state" role="status">
                جارٍ التحميل…
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<InvitationPage />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/admin" element={<AdminDashboardPage />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
          <Toaster position="top-center" richColors dir="rtl" />
        </AuthProvider>
      </InvitationProvider>
    </BrowserRouter>
  );
}
