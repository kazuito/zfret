import { HeartIcon, HistoryIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="border-b sticky top-0 z-10 bg-background">
      <div className="max-w-3xl mx-auto px-6 h-12 flex items-center">
        <Link href="/" className="font-semibold text-sm">
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
