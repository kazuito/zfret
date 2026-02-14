import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="mx-auto max-w-3xl p-6 pt-0">
      <div>{children}</div>
      <div className="mt-6 flex justify-center">
        <Button variant="ghost" asChild>
          <Link href="/">
            <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
            Back
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Layout;
