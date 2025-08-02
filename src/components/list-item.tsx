import Link from "next/link";

type Props = {
  prefix?: React.ReactNode;
  title?: string;
  description?: string;
  href: string;
};

const ListItem = ({ prefix, title, description, href }: Props) => {
  return (
    <Link
      href={href}
      className="py-3 px-4 flex items-center gap-3 bg-secondary/20 rounded-md border border-border/60"
    >
      {prefix && <div className="w-6 text-sm text-foreground/80">{prefix}</div>}
      <div className="">{title}</div>
      {description && (
        <div className="text-sm text-foreground/60">{description}</div>
      )}
    </Link>
  );
};

export default ListItem;
