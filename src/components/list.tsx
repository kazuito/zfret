import Link from "next/link";

type ListProps = {
  prefix?: React.ReactNode;
  title?: React.ReactNode;
  children?: React.ReactNode;
};

const List = ({ prefix, title, children }: ListProps) => {
  return (
    <div className="rounded-lg bg-secondary/20 border border-border/60">
      {(title || prefix) && (
        <div className="flex items-center gap-2.5 px-5.5 py-4 [&_svg]:size-4.5 font-semibold">
          {prefix}
          {title}
        </div>
      )}
      <div className="flex flex-col gap-1 p-1">{children}</div>
    </div>
  );
};

type ListItemProps = {
  children?: React.ReactNode;
  description?: React.ReactNode;
  href: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
};

const ListItem = ({
  children,
  description,
  href,
  prefix,
  suffix,
}: ListItemProps) => {
  return (
    <Link
      href={href}
      className="py-3 px-4 flex items-center gap-3 bg-secondary/20 rounded-md border border-border/60"
    >
      {prefix && (
        <div className="text-sm text-foreground/80 [&_svg]:size-4.5">
          {prefix}
        </div>
      )}
      <div className="truncate">{children}</div>
      {description && (
        <div className="text-sm text-foreground/60 truncate">{description}</div>
      )}
      {suffix && (
        <div className="ml-auto text-sm text-foreground/40 text-nowrap">
          {suffix}
        </div>
      )}
    </Link>
  );
};

export { List, ListItem };
