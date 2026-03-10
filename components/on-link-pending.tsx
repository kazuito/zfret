"use client";

import { useLinkStatus } from "next/link";

export const OnLinkPending = ({ children }: { children?: React.ReactNode }) => {
  const { pending } = useLinkStatus();
  return pending ? children : null;
};
