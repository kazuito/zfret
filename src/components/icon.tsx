import { HugeiconsIcon } from "@hugeicons/react";

export const Icon = ({
  ...props
}: React.ComponentProps<typeof HugeiconsIcon>) => {
  return <HugeiconsIcon strokeWidth={2.2} {...props} />;
};
