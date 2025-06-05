import { Skeleton } from "@/components/ui/skeleton";
import { SearchIcon } from "lucide-react";

export function SearchPageSkeleton() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2">
        <SearchIcon size={22} />
        <Skeleton className="h-7 w-32" />
      </div>
      <div className="mt-6">
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-24 rounded-full" />
          ))}
        </div>
        <div className="mt-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center p-2 rounded-sm">
              <Skeleton className="h-4 w-4 shrink-0" />
              <Skeleton className="ml-2 h-4 flex-1 max-w-md" />
              <Skeleton className="ml-4 h-4 w-20 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
