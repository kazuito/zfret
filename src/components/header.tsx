import { HugeiconsIcon } from "@hugeicons/react";
import {
  Clock02Icon,
  FavouriteIcon,
  SearchIcon,
} from "@hugeicons/core-free-icons";
import Link from "next/link";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="bg-background sticky top-0 z-20 border-b">
      <div className="mx-auto flex h-12 max-w-5xl items-center px-6">
        <Link href="/" className="text-sm font-semibold">
          Z-FRET
        </Link>
        <div className="ml-auto">
          <Button size="icon" variant="ghost" asChild>
            <Link href="/search" title="Search">
              <HugeiconsIcon icon={SearchIcon} />
              <span className="sr-only">Search</span>
            </Link>
          </Button>
          <Button size="icon" variant="ghost" asChild>
            <Link href="/favorites" title="Favorites">
              <HugeiconsIcon icon={FavouriteIcon} />
              <span className="sr-only">Favorites</span>
            </Link>
          </Button>
          <Button size="icon" variant="ghost" asChild>
            <Link href="/history" title="History">
              <HugeiconsIcon icon={Clock02Icon} />
              <span className="sr-only">History</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
