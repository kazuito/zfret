import { SearchPageSkeleton } from "@/components/search-page-skeleton";
import { Suspense } from "react";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<SearchPageSkeleton />}>{children}</Suspense>;
}
