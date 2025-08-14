"use client";

import { useIsClient } from "@uidotdev/usehooks";

type Props = {
  children: React.ReactNode;
};

export const ClientOnly: React.FC<Props> = ({ children }) => {
  const isClient = useIsClient();

  return isClient ? <>{children}</> : null;
};
