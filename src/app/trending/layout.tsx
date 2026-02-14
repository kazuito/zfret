import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { Icon } from "@/components/icon";
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
            <Icon icon={ArrowLeft01Icon} size={20} />
            Back
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Layout;
