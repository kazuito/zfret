import Link from "next/link";

type Props = {
  children?: React.ReactNode;
  subtitle?: React.ReactNode;
  endContent?: React.ReactNode;
};

const PageHeading = ({ children, subtitle, endContent }: Props) => {
  return (
    <div className="my-10 flex px-2">
      <div>
        <Link
          href=""
          className="flex w-fit items-center gap-2 text-xl font-semibold sm:gap-3 sm:text-2xl [&_svg]:size-5 sm:[&_svg]:size-6"
        >
          {children}
        </Link>
        {subtitle && (
          <div className="text-foreground/60 mt-1 w-fit sm:text-lg">
            {subtitle}
          </div>
        )}
      </div>
      {endContent && <div className="ml-auto">{endContent}</div>}
    </div>
  );
};

export default PageHeading;
