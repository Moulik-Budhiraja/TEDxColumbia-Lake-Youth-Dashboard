"use client";

import Button from "@/components/Button/Button";
import Html5QrcodePlugin from "@/components/Html5QrcodePlugin/Html5QrcodePlugin";
import ErrorNotification from "@/components/Notification/ErrorNotification";
import { getUser } from "@/serverFunctions/user/getUser";
import { setBadge } from "@/serverFunctions/user/setBadge";
import { UserWithRole, UserWithRsvp } from "@/types/morePrismaTypes";
import { useCallback, useEffect, useState } from "react";
import Notification from "@/components/Notification/Notification";
import SuccessNotification from "@/components/Notification/SuccessNotification";
import { getUserFromBadge } from "@/serverFunctions/user/getUserFromBadge";
import { setClaimedMeal } from "@/serverFunctions/user/setClaimedMeal";

type ScanState = {
  currentState: "getUser" | "assignBadge";
  error: string | null;
  success: string | null;
};

export default function QRScanner() {
  const [targetUser, setTargetUser] = useState<
    UserWithRole | UserWithRsvp | null
  >(null);
  const [scanning, setScanning] = useState(false);
  const [meal, setMeal] = useState("Unknown");
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
      }).then((user) => {
        localStorage.setItem("targetUser", JSON.stringify(user));
      });
    }

    localStorage.setItem("qrScannerState", "getUser");
  }, []);

  const handleQRScan = (value: string) => {
    const currentState = localStorage.getItem("qrScannerState");
    const targetUser: UserWithRole | UserWithRsvp = JSON.parse(
      localStorage.getItem("targetUser") ?? "{}"
    );

    if (targetUser) {
      setTargetUser(targetUser);
    }

    setState((prev) => ({
      ...prev,
      currentState: currentState as ScanState["currentState"],
    }));

    if (currentState === "getUser") {
      if (value.startsWith("URL:")) {
        getUserFromBadge(value).then((result) => {
          if (result.success && result.user) {
            localStorage.setItem("targetUser", JSON.stringify(result.user));

            setMeal(result.user.rsvp?.mealPreference ?? "Unknown");

            setState((prev) => ({
              ...prev,
              success: "Loaded User",
              error: null,
            }));
          }
        });
      }

      getUser({
        by: "id",
        id: value,
      }).then((user) => {
        if (!user) {
          setState((prev) => {
            if (prev.success === "Loaded User") return prev;

            prev.error = "User not found";
            return { ...prev };
          });

          return;
        }

        localStorage.setItem("targetUser", JSON.stringify(user));

        setState((prev) => ({ ...prev, success: "Found User", error: null }));
      });
      setScanning(false);
    } else {
      if (!targetUser) {
        console.log("No target user");
        return;
      }
      setBadge(value, targetUser.id).then((result) => {
        if (!result.success) {
          setState((prev) => ({ ...prev, error: result.error }));
        }

        getUser({
          by: "id",
          id: targetUser.id,
        }).then((user) => {
          localStorage.setItem("qrScannerState", "getUser");
          localStorage.setItem("targetUser", JSON.stringify(user));

          setState((prev) => ({
            ...prev,
            currentState: "getUser",
            success: "Assigned Badge",
          }));

          setScanning(false);
        });
      });
    }
  };

  return (
    <div
      className="h-full flex flex-col md:flex-row md:gap-4"
      onClick={() => {
        console.log(state);
      }}
    >
      <Html5QrcodePlugin
        qrbox={600}
        fps={30}
        scanning={scanning}
        qrCodeSuccessCallback={(value) => {
          handleQRScan(value);
        }}
        onStartScanning={() => setScanning(true)}
        onStopScanning={() => setScanning(false)}
      />

      <div className="flex flex-col gap-4 h-full mt-8 mb-8 md:w-160">
        <div>
          {localStorage.getItem("qrScannerState") === "assignBadge" && (
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
                  targetUser?.role?.name.at(0)?.toUpperCase() +
                  targetUser?.role?.name.slice(1)}
              </div>
            </div>
            <div className="-mt-1 text-sm opacity-70">{targetUser.email}</div>
            {!targetUser.qr ? (
              <div className="flex justify-end">
                <Button
                  small={true}
                  onClick={() => {
                    localStorage.setItem("qrScannerState", "assignBadge");
                    setScanning(true);
                  }}
                >
                  Link QR
                </Button>
              </div>
            ) : (
              <>
                <div className="mt-4 text-sm opacity-70">{`Badge ID: ${targetUser.qr}`}</div>
                <div className="mt-2 flex gap-2">
                  <input
                    type="checkbox"
                    id="claimed-meal"
                    defaultChecked={targetUser.claimedMeal}
                    onChange={(e) => {
                      setClaimedMeal(targetUser.id, e.target.checked);
                    }}
                  />
                  <label htmlFor="claimed-meal">Claimed Meal: {meal} </label>
                </div>
                {meal === "Unknown" && (
                  <div className="text-sm opacity-70">{`*Badge scan required to see meal`}</div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
