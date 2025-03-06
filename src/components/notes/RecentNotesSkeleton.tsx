
import { Card, CardContent } from "@/components/ui/card";

interface RecentNotesSkeletonProps {
  count?: number;
}

export const RecentNotesSkeleton = ({ count = 3 }: RecentNotesSkeletonProps) => {
  return (
    <div className="space-y-4">
      {[...Array(count)].map((_, index) => (
        <Card key={index} className="animate-pulse">
          <CardContent className="p-4 flex items-start gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded-md w-1/2"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
