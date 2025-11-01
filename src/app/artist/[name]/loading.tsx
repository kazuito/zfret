import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="mx-auto max-w-3xl p-6 pt-0">
      <div className="my-10">
        <Skeleton className="h-8 w-40" />
      </div>
      <Skeleton className="h-screen w-full" />
    </div>
  );
};

export default Loading;
