"use client";

import type { ElementType, ReactNode } from "react";
import { useReveal } from "@/lib/useReveal";

export function Reveal({
  as: Tag = "div",
  className,
  children,
  ...opts
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  y?: number;
  stagger?: number;
}) {
  const ref = useReveal<HTMLElement>(opts);
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
