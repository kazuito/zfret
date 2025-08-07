
import Link from "next/link";

type ListProps = {
  heading?: React.ReactNode;
  children?: React.ReactNode;
};

const List = ({ heading, children }: ListProps) => {
  return (
    <div className="rounded-lg bg-secondary/20 border border-border/60">
      {heading && <div className="p-4 font-semibold text-sm">{heading}</div>}
      <div className="flex flex-col gap-1 p-1">{children}</div>
    </div>
  );
};

type ListItemProps = {
  title?: string;
  description?: string;
  href: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
};

const ListItem = ({ prefix, title, description, href, suffix }: ListItemProps) => {
  return (
    <Link
      href={href}
      className="py-3 px-4 flex items-center gap-3 bg-secondary/20 rounded-md border border-border/60"
    >
      {prefix && <div className="w-6 text-sm text-foreground/80">{prefix}</div>}
      <div className="truncate">{title}</div>
      {description && (
        <div className="text-sm text-foreground/60 truncate">{description}</div>
      )}
      {suffix && <div className="ml-auto text-sm text-foreground/40">{suffix}</div>}
    </Link>
  );
};

export { List, ListItem };
