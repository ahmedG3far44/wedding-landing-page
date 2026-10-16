import { AdminLayout } from "../components/admin/AdminLayout";
import { InvitationEditor } from "../components/admin/InvitationEditor";
export function AdminDashboardPage() {
  return (
    <AdminLayout>
      <InvitationEditor />
    </AdminLayout>
  );
}
