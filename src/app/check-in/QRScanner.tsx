"use client";

import Button from "@/components/Button/Button";
import Html5QrcodePlugin from "@/components/Html5QrcodePlugin/Html5QrcodePlugin";
import ErrorNotification from "@/components/Notification/ErrorNotification";
import { serverLog } from "@/serverFunctions/log/serverLog";
import { getUser } from "@/serverFunctions/user/getUser";
import { setBadge } from "@/serverFunctions/user/setBadge";
import { UserWithRole } from "@/types/morePrismaTypes";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Notification from "@/components/Notification/Notification";
import SuccessNotification from "@/components/Notification/SuccessNotification";

type ScanState = {
  currentState: "getUser" | "assignBadge";
  error: string | null;
  success: string | null;
};

export default function QRScanner() {
  const [targetUser, setTargetUser] = useState<UserWithRole | null>(null);
  const [scanning, setScanning] = useState(false);
  const [state, setState] = useState<ScanState>({
    currentState: "getUser",
    error: null,
    success: null,
  });

  useEffect(() => {
    const currentURL = new URL(window.location.href);
    const targetUserId = currentURL.searchParams.get("assign");

    if (targetUserId) {
      getUser({
        by: "id",
        id: targetUserId,
      }).then((user) => setTargetUser(user));
    }
  }, []);

  const handleQRScan = (value: string) => {
    setState((prev) => ({
      ...prev,
      error: null,
      success: null,
    }));

    if (state.currentState === "getUser") {
      getUser({
        by: "id",
        id: value,
      }).then((user) => {
        if (!user) {
          setState((prev) => ({
            ...prev,
            error: "User not found",
          }));
          return true;
        }

        setTargetUser(user);
      });

      setScanning(false);
      return true;
    } else {
      if (!targetUser) {
        console.log("No target user");
        return true;
      }
      setBadge(value, targetUser.id).then((result) => {
        if (!result.success) {
          setState((prev) => ({
            ...prev,
            error: result.error,
          }));
          return true;
        }

        getUser({
          by: "id",
          id: targetUser.id,
        }).then((user) => {
          setTargetUser(user);
          setState((prev) => ({
            ...prev,
            currentState: "getUser",
            success: "Badge assigned",
          }));
        });
      });

      return true;
    }
  };

  return (
    <div className="h-full flex flex-col md:flex-row md:gap-4">
      <Html5QrcodePlugin
        qrbox={600}
        fps={30}
        scanning={scanning}
        qrCodeSuccessCallback={handleQRScan}
        onStartScanning={() => setScanning(true)}
        onStopScanning={() => setScanning(false)}
      />

      <div className="flex flex-col h-full mt-16 mb-4 md:w-160">
        <div>
          {state.currentState === "assignBadge" && (
            <Notification>Scan a badge to assign to user</Notification>
          )}
          {state.success && (
            <SuccessNotification>{state.success}</SuccessNotification>
          )}
          {state.error && <ErrorNotification>{state.error}</ErrorNotification>}
        </div>
        {targetUser && (
          <div className="m-2 mt-auto p-2 rounded-md border border-slate-400 dark:border-slate-700">
            <div className="flex gap-1 items-center">
              <div className="text-2xl font-bold">{`${targetUser.firstName} ${targetUser.lastName}`}</div>
              <div className="opacity-60">
                {"| " +
                  targetUser.role.name.at(0)?.toUpperCase() +
                  targetUser.role.name.slice(1)}
              </div>
            </div>
            <div className="-mt-1 text-sm opacity-70">{targetUser.email}</div>
            {!targetUser.qr ? (
              <div className="flex justify-end">
                <Button
                  small={true}
                  onClick={() => {
                    setState({
                      ...state,
                      currentState: "assignBadge",
                    });
                    setScanning(true);
                  }}
                >
                  Link QR
                </Button>
              </div>
            ) : (
              <div className="mt-4 text-sm opacity-70">{`Badge ID: ${targetUser.qr}`}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
