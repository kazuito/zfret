import Link from "next/link";

type Props = {};

const Header = ({}: Props) => {
  return (
    <header className="border-b sticky top-0 z-10 bg-background">
      <div className="max-w-3xl mx-auto px-6 h-12 flex items-center">
        <Link href="/" className="font-semibold text-sm">
          Z-FRET
        </Link>
        {/* <div className="ml-auto">
          <Button size="icon" variant="ghost">
            <SearchIcon />
          </Button>
        </div> */}
      </div>
    </header>
  );
};

export default Header;
