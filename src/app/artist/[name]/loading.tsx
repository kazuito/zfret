import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div>
        <Skeleton className="w-40 h-8" />
      </div>
      <div className="mt-6 flex flex-col gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="w-full h-6" />
        ))}
      </div>
    </div>
  );
};

export default Loading;
