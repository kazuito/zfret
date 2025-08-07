import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

const Footer = () => {
  return (
    <div className="border-t bg-secondary/20">
      <div className="max-w-3xl mx-auto p-6 min-h-40 flex items-center">
        <Link href="/" className="font-semibold">
          Z-FRET
        </Link>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Footer;
