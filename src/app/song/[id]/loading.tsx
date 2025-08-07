import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="p-6 pt-0 mx-auto max-w-3xl">
      <div className="my-10">
        <Skeleton className="h-8 w-60" />
        <Skeleton className="h-5.5 w-40 mt-2" />
      </div>
      <div className="mt-10">
        <Skeleton className="h-screen w-full" />
      </div>
    </div>
  );
};

export default Loading;
