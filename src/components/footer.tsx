import Link from "next/link";

const Footer = () => {
  return (
    <div className="border-t bg-secondary/20">
      <div className="max-w-3xl mx-auto p-6 min-h-40 flex items-center">
        <Link href="/" className="font-semibold">
          Z-FRET
        </Link>
      </div>
    </div>
  );
};

export default Footer;
