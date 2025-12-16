import { cn } from "@/lib/utils";
import { Slot } from "radix-ui";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ListWrapper = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "bg-secondary/40 dark:bg-secondary/20 border-border/60 rounded-lg border",
        className,
      )}
      {...props}
    />
  );
};

type ListHeaderProps = React.ComponentProps<"div"> & {
  asChild?: boolean;
};

const ListHeader = ({ asChild = false, ...props }: ListHeaderProps) => {
  const Comp = asChild ? Slot.Root : "div";

  return (
    <Comp
      className="flex items-center gap-2.5 px-5.5 py-4 font-semibold [&_svg]:size-4.5"
      {...props}
    />
  );
};

type ListContentProps = {
  children?: React.ReactNode;
};

const ListContent = ({ children }: ListContentProps) => {
  return <div className="flex flex-col gap-1 p-1">{children}</div>;
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
      className="bg-background dark:bg-secondary/20 border-border/60 flex items-center gap-3 rounded-md border px-4 py-3"
    >
      {prefix && (
        <div className="text-foreground/80 text-sm [&_svg]:size-4.5">
          {prefix}
        </div>
      )}
      <div className="truncate">{children}</div>
      {description && (
        <div className="text-foreground/60 truncate text-sm">{description}</div>
      )}
      {suffix && (
        <div className="text-foreground/40 ml-auto text-sm text-nowrap">
          {suffix}
        </div>
      )}
    </Link>
  );
};

type ListFooterProps = {
  children?: React.ReactNode;
};

const ListFooter = ({ children }: ListFooterProps) => {
  return <div className="flex justify-end p-2 pt-1">{children}</div>;
};

type ListFooterLinkProps = React.ComponentProps<typeof Link>;

const ListFooterLink = ({ className, ...props }: ListFooterLinkProps) => {
  return (
    <Button asChild variant="ghost">
      <Link
        className={cn("text-foreground/60 flex items-center", className)}
        {...props}
      ></Link>
    </Button>
  );
};

const List = {
  Wrapper: ListWrapper,
  Header: ListHeader,
  Content: ListContent,
  Item: ListItem,
  Footer: ListFooter,
  FooterLink: ListFooterLink,
};

export { List };
