import { HomeIcon, SearchIcon } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="sticky bottom-0 p-4 flex justify-center">
      <div className="flex gap-2 backdrop-blur-sm rounded-full p-2 bg-primary/5 border">
        <Link
          href="/"
          className="size-8 flex items-center justify-center rounded-full"
        >
          <HomeIcon size={20} />
        </Link>
        <Link
          href="/search"
          className="size-8 flex items-center justify-center rounded-full"
        >
          <SearchIcon size={20} />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
