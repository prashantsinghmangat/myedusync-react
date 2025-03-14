
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent,
  Button
} from "@/components/ui";
import { Star } from "lucide-react";

export const ReviewsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Star className="mr-2 h-5 w-5 text-yellow-500 fill-yellow-500" />
          Student Reviews
        </CardTitle>
        <CardDescription>
          What students are saying
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <div className="text-7xl font-bold text-gray-800 dark:text-white">5.0</div>
          <div className="flex justify-center my-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 text-yellow-500 fill-yellow-500" />
            ))}
          </div>
          <div className="text-gray-500 mb-6">Based on recent reviews</div>
          
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              No reviews yet. Be the first to leave a review after booking a session.
            </p>
            <Button variant="outline">
              Write a Review
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
