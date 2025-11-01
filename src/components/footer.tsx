import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

const Footer = () => {
  return (
    <div className="bg-secondary/20 border-t">
      <div className="mx-auto flex min-h-40 max-w-3xl items-center p-6">
        <div>
          <Link href="/" className="font-semibold">
            Z-FRET
          </Link>
          <div className="text-foreground/60 mt-1 text-sm">
            Z-FRET is using data from{" "}
            <Link href="https://www.ufret.jp" target="_blank">
              www.ufret.jp
            </Link>
          </div>
        </div>
        <div className="ml-auto flex h-5 items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="https://github.com/kazuito/zfret" target="_blank">
              Source
            </Link>
          </Button>
          <Separator orientation="vertical" />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Footer;
