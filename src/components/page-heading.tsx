type Props = {
  children?: React.ReactNode;
  subtitle?: React.ReactNode;
};

const PageHeading = ({ children, subtitle }: Props) => {
  return (
    <div className="my-10">
      <div className="font-semibold text-xl sm:text-2xl flex items-center gap-2 sm:gap-3 [&_svg]:size-5 sm:[&_svg]:size-6">{children}</div>
      {subtitle && <div className="sm:text-lg text-foreground/60 mt-1">{subtitle}</div>}
    </div>
  );
};

export default PageHeading;
