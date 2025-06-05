import Link from "next/link";
import Search from "./search";

type Props = {};

const Header = ({}: Props) => {
  return (
    <div className="flex items-center h-16 w-full border-b px-6 backdrop-blur-2xl z-10">
      <Link href="/">Z-FRET</Link>
      <div className="ml-auto">
        <Search />
      </div>
    </div>
  );
};

export default Header;
