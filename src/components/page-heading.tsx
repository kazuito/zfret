type Props = {
  children?: React.ReactNode;
  subtitle?: React.ReactNode;
};

const PageHeading = ({ children, subtitle }: Props) => {
  return (
    <div className="my-10">
      <div className="font-semibold text-xl sm:text-2xl">{children}</div>
      {subtitle && <div className="sm:text-lg text-foreground/60 mt-1">{subtitle}</div>}
    </div>
  );
};

export default PageHeading;
