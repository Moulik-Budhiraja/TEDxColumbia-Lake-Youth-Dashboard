"use client";

import { useRouter } from "next/navigation";
import { type } from "os";
import { useCallback } from "react";
import FilterChip from "./FilterChip";

type Props = {
  searchParams: {
    [key: string]: string;
  };
};

export default function Filters({ searchParams }: Props) {
  const current = new URLSearchParams(searchParams);
  const router = useRouter();

  console.log(current.get("role"));

  const setParam = useCallback((key: string, value: string | null) => {
    if (value) {
      current.set(key, value);
    } else {
      current.delete(key);
    }

    const search = current.toString();

    router.replace(`${window.location.pathname}?${search}`);
  }, []);

  return (
    <div className="mx-4 my-2">
      <div className="font-bold">Filter:</div>
      <div className="mt-2 flex gap-2">
        <FilterChip
          selected={current.get("role") === null}
          onClick={() => {
            setParam("role", null);
          }}
        >
          All
        </FilterChip>
        <FilterChip
          selected={current.get("role") === "admin"}
          onClick={() => {
            setParam("role", "admin");
          }}
        >
          Admin
        </FilterChip>{" "}
        <FilterChip
          selected={current.get("role") === "speaker"}
          onClick={() => {
            setParam("role", "speaker");
          }}
        >
          Speaker
        </FilterChip>{" "}
        <FilterChip
          selected={current.get("role") === "attendee"}
          onClick={() => {
            setParam("role", "attendee");
          }}
        >
          Attendee
        </FilterChip>
      </div>
      <div className="mt-2 flex gap-2">
        <FilterChip
          selected={current.get("attending") === null}
          onClick={() => {
            setParam("attending", null);
          }}
        >
          All
        </FilterChip>{" "}
        <FilterChip
          selected={current.get("attending") === "true"}
          onClick={() => {
            setParam("attending", "true");
          }}
        >
          Attending
        </FilterChip>{" "}
        <FilterChip
          selected={current.get("attending") === "false"}
          onClick={() => {
            setParam("attending", "false");
          }}
        >
          Not Attending
        </FilterChip>{" "}
        <FilterChip
          selected={current.get("attending") === "unknown"}
          onClick={() => {
            setParam("attending", "unknown");
          }}
        >
          Unknown
        </FilterChip>
      </div>
    </div>
  );
}
