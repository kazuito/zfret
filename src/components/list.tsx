type Props = {
  heading?: React.ReactNode;
  children?: React.ReactNode;
};

const List = ({ heading, children }: Props) => {
  return (
    <div className="rounded-lg bg-secondary/20 border border-border/60">
      {heading && <div className="p-4 font-semibold text-sm">{heading}</div>}
      <div className="flex flex-col gap-1 p-1">{children}</div>
    </div>
  );
};

export default List;
