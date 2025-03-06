import { useNavigate } from 'react-router-dom';
import { TutorCard } from "./TutorCard";
import { Card } from "@/components/ui/card";
import { TutorListItem } from "./TutorListItem";

export interface Tutor {
  _id: string;
  name: string;
  location: string;
  profilePic: string;
  currentDesignation: string;
  shortBio?: string;
  skills?: string;
  boards?: string;
  classes?: string;
  subjects?: string;
  hourlyRate?: string;
  rating?: number;
  reviewCount?: number;
  lessonsCompleted?: number;
  responseTime?: string;
}

interface TutorGridProps {
  tutors: Tutor[];
  loading: boolean;
  view?: 'grid' | 'list';
}

export const TutorGrid = ({ tutors, loading, view = 'list' }: TutorGridProps) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className={view === 'grid' 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
        : "flex flex-col space-y-4"
      }>
        {[1, 2, 3, 4, 5, 6].map((_, index) => (
          <Card key={index} className="opacity-60 animate-pulse">
            <div className={view === 'grid' ? "h-48 bg-gray-300 dark:bg-gray-700 rounded-t-lg" : "flex p-4"}>
              <div className={view === 'grid' ? "w-full h-full" : "w-32 h-32 rounded-lg mr-4 bg-gray-300 dark:bg-gray-700"}></div>
              <div className="pt-6 p-4 flex-1">
                <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 mb-4 rounded"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 mb-2 rounded"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 mb-2 rounded"></div>
                <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (tutors.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No tutors found</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          We couldn't find any tutors matching your criteria. Try adjusting your search parameters.
        </p>
        <img 
          src="https://cdni.iconscout.com/illustration/premium/thumb/no-search-found-2511613-2132878.png" 
          alt="No results" 
          className="max-w-xs mx-auto"
        />
      </div>
    );
  }

  return (
    <div className={view === 'grid' 
      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
      : "flex flex-col space-y-4"
    }>
      {tutors.map((tutor, index) => (
        view === 'grid' 
          ? <TutorCard key={tutor._id} tutor={tutor} index={index} /> 
          : <TutorListItem key={tutor._id} tutor={tutor} index={index} />
      ))}
    </div>
  );
};