import { HeartIcon, HistoryIcon, SearchIcon } from "lucide-react";
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
              <SearchIcon />
              <span className="sr-only">Search</span>
            </Link>
          </Button>
          <Button size="icon" variant="ghost" asChild>
            <Link href="/favorites" title="Favorites">
              <HeartIcon />
              <span className="sr-only">Favorites</span>
            </Link>
          </Button>
          <Button size="icon" variant="ghost" asChild>
            <Link href="/history" title="History">
              <HistoryIcon />
              <span className="sr-only">History</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
