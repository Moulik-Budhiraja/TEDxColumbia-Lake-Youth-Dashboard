import Header from "@/components/Header/Header";
import QRScanner from "./QRScanner";
import { requirePermission } from "@/serverFunctions/user/requirePermission";

export default async function CheckIn() {
  await requirePermission("admin");

  return (
    <div className="h-[100svh] flex flex-col">
      <Header title="Check In"></Header>
      <QRScanner></QRScanner>
    </div>
  );
}
