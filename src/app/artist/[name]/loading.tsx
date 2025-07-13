import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Artist name skeleton */}
      <div className="w-fit flex items-center gap-2">
        <Skeleton className="h-8 w-48" />
      </div>
      
      {/* Song list skeleton */}
      <div className="flex flex-col mt-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="p-2 flex gap-2 items-center rounded-sm">
            <Skeleton className="h-4 flex-1 max-w-md" />
          </div>
        ))}
      </div>
    </div>
  );
}