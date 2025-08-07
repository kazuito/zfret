import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import Link from "next/link";
import { Button } from "./ui/button";

type ListWrapperProps = {
  children?: React.ReactNode;
};

const ListWrapper = ({ children }: ListWrapperProps) => {
  return (
    <div className="rounded-lg bg-secondary/20 border border-border/60">
      {children}
    </div>
  );
};

type ListHeaderProps = React.ComponentProps<"div"> & {
  asChild?: boolean;
};

const ListHeader = ({ asChild = false, ...props }: ListHeaderProps) => {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      className="flex items-center gap-2.5 px-5.5 py-4 [&_svg]:size-4.5 font-semibold"
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

type ListFooterProps = {
  children?: React.ReactNode;
};

const ListFooter = ({ children }: ListFooterProps) => {
  return <div className="p-2 flex justify-end pt-1">{children}</div>;
};

type ListFooterLinkProps = React.ComponentProps<typeof Link>;

const ListFooterLink = ({ className, ...props }: ListFooterLinkProps) => {
  return (
    <Button asChild variant="ghost">
      <Link
        className={cn(
          "flex items-center text-foreground/60 [&_svg]:size-4 gap-1.5",
          className
        )}
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
