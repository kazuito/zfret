import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="p-6 pt-4 mx-auto max-w-3xl">
      <div>
        <Skeleton className="h-18 w-full" />
      </div>
      <div className="mt-8">
        <div className="flex flex-col gap-2">
          {Array.from({ length: 24 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-6 mb-2"
              style={{ width: `${Math.floor(Math.random() * 60) + 10}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
