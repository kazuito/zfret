import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

const Footer = () => {
  return (
    <div className="border-t bg-secondary/20">
      <div className="mx-auto flex min-h-40 max-w-5xl items-center p-6">
        <div>
          <Link href="/" className="font-semibold">
            Z-FRET
          </Link>
          <div className="mt-1 text-foreground/60 text-sm">
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
