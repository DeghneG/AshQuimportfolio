"use client";

import { useEffect, useState } from "react";

/** Live local time for the footer. Renders empty on the server to avoid hydration mismatch. */
export function LocalTime({ timeZone = "Asia/Manila", city = "Iloilo" }: { timeZone?: string; city?: string }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, [timeZone]);

  return (
    <span>
      {city} <span className="inline-block min-w-[2.6em]">{time}</span>
    </span>
  );
}
