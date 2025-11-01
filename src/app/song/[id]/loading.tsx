import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="mx-auto max-w-3xl p-6 pt-0">
      <div className="my-10">
        <Skeleton className="h-8 w-60" />
        <Skeleton className="mt-2 h-5.5 w-40" />
      </div>
      <div className="mt-10">
        <Skeleton className="h-screen w-full" />
      </div>
    </div>
  );
};

export default Loading;
