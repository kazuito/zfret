import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="max-w-3xl mx-auto p-6 pt-0">
      <div>{children}</div>
      <div className="flex mt-6 justify-center">
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
