import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

const Footer = () => {
  return (
    <div className="border-t bg-secondary/20">
      <div className="max-w-3xl mx-auto p-6 min-h-40 flex items-center">
        <div>
          <Link href="/" className="font-semibold">
            Z-FRET
          </Link>
          <div className="text-sm text-foreground/60 mt-1">
            This app is using data from <Link href="https://www.ufret.jp" target="_blank">
            www.ufret.jp
            </Link>
          </div>
        </div>
        <div className="ml-auto flex items-center h-5 gap-2">
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
