
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const NoteDetailSkeleton = () => {
  return (
    <Card className="p-6 animate-pulse">
      <CardHeader>
        <div className="text-center">
          <div className="h-10 bg-gray-200 rounded-md w-3/4 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-200 rounded-md w-1/4 mx-auto"></div>
        </div>
      </CardHeader>

      {/* Featured Image Skeleton */}
      <div className="flex justify-center my-6">
        <div className="w-full h-64 bg-gray-200 rounded-lg"></div>
      </div>

      <CardContent>
        <div className="space-y-6">
          {/* Note Details Skeleton */}
          <div>
            <div className="h-6 bg-gray-200 rounded-md w-1/4 mb-4"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded-md"></div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Note Content Skeleton */}
          <div>
            <div className="h-6 bg-gray-200 rounded-md w-1/4 mb-4"></div>
            <div className="space-y-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded-md"></div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Tags Skeleton */}
          <div className="flex flex-wrap gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-6 w-16 bg-gray-200 rounded-md"></div>
            ))}
          </div>

          {/* Metadata Skeleton */}
          <div className="space-y-2">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded-md w-1/3"></div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
