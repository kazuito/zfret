import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

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
            <ArrowLeftIcon />
            Back
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Layout;
