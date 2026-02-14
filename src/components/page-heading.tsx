import Link from "next/link";

type Props = {
  children?: React.ReactNode;
  subtitle?: React.ReactNode;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
};

const PageHeading = ({
  children,
  subtitle,
  startContent,
  endContent,
}: Props) => {
  return (
    <div className="my-10 flex items-center">
      {startContent && <div>{startContent}</div>}
      <div>
        <Link
          href=""
          className="flex w-fit items-center gap-2 font-semibold text-xl sm:gap-3 sm:text-2xl [&_svg]:size-5 sm:[&_svg]:size-6"
        >
          {children}
        </Link>
        {subtitle && (
          <div className="mt-1 w-fit text-foreground/60 sm:text-lg">
            {subtitle}
          </div>
        )}
      </div>
      {endContent && <div className="ml-auto">{endContent}</div>}
    </div>
  );
};

export default PageHeading;
