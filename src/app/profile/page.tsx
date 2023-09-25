import Header from "@/components/Header/Header";
import { requirePermission } from "@/serverFunctions/user/requirePermission";

export default async function Profile() {
  await requirePermission("scanQr");

  return (
    <div className="h-screen">
      <Header title="Profile" description="Not Implemented"></Header>
    </div>
  );
}
