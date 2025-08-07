import Link from "next/link";

type Props = {
  children?: React.ReactNode;
  subtitle?: React.ReactNode;
  endContent?: React.ReactNode;
};

const PageHeading = ({ children, subtitle, endContent }: Props) => {
  return (
    <div className="my-10 px-2 flex">
      <div>
        <Link
          href=""
          className="font-semibold text-xl sm:text-2xl flex items-center gap-2 sm:gap-3 [&_svg]:size-5 sm:[&_svg]:size-6 w-fit"
        >
          {children}
        </Link>
        {subtitle && (
          <div className="sm:text-lg text-foreground/60 mt-1 w-fit">
            {subtitle}
          </div>
        )}
      </div>
      {endContent && <div className="ml-auto">{endContent}</div>}
    </div>
  );
};

export default PageHeading;
