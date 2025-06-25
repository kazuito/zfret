import Link from "next/link";
import Search from "./search";

const Header = () => {
  return (
    <div className="sticky top-0 backdrop-blur-2xl z-10 border-b">
      <div className="flex max-w-3xl items-center h-14 w-full px-6 mx-auto">
        <Link className="font-semibold" href="/">Z-FRET</Link>
        <div className="ml-auto">
          <Search />
        </div>
      </div>
    </div>
  );
};

export default Header;
