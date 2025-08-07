import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 pt-0">
      <div className="my-10">
        <Skeleton className="w-40 h-8" />
      </div>
      <Skeleton className="h-screen w-full" />
    </div>
  );
};

export default Loading;
