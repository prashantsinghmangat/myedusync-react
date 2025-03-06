
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export const NoteCardSkeleton = () => {
  return (
    <Card className="animate-pulse">
      <CardHeader>
        <div className="w-full h-48 bg-gray-200 rounded-t-lg mb-4"></div>
        <div className="h-6 bg-gray-200 rounded-md w-3/4"></div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded-md w-1/3"></div>
          <div className="flex flex-wrap gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-6 w-16 bg-gray-200 rounded-full"></div>
            ))}
          </div>
          <div className="pt-2 space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded-md"></div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
