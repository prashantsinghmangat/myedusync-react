
import { useQuery } from '@tanstack/react-query';
import { Star } from 'lucide-react';
import { API_ENDPOINTS } from '@/config/api';
import { apiGet } from '@/utils/apiInterceptor';

export const PopularTeachers = () => {
    const { data: tutors = [], isLoading, error } = useQuery({
        queryKey: ['topTutors'],
        queryFn: async () => {
            const response = await apiGet(API_ENDPOINTS.tutors.list, {
              requiresAuth: true
            });

            const data = await response.json();
            return data?.data || [];
        },
    });

    return (
        <div className="w-full bg-white dark:bg-gray-900 py-16">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-2 bg-primary/20 rounded-full mb-4">
                <span className="text-primary dark:text-primary">Popular Teachers</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Meet Our Expert Teachers</h2>
            </div>
    
            {/* Loading State */}
            {isLoading && <p className="text-center text-gray-600 dark:text-gray-400">Loading tutors...</p>}
            {error && <p className="text-center text-red-500">Failed to load tutors</p>}
    
            {/* Tutor Cards */}
            {!isLoading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {tutors.map((tutor) => (
                  <div key={tutor._id} className="bg-secondary/10 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md transition-transform hover:translate-y-[-5px]">
                    <img
                      src={tutor.profilePic || 'https://via.placeholder.com/300'}
                      alt={tutor.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{tutor.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{tutor.currentDesignation}</p>
                      
                      <div className="flex items-center space-x-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                        ))}
                        <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">(N/A Reviews)</span>
                      </div>
    
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{tutor.weeklySessions} Sessions/Week</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{tutor.costPerSessions} {tutor.currency}/Session</span>
                      </div>
    
                      <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                        <strong>Subject:</strong> {tutor.subject} ({tutor.board})<br />
                        <strong>Class:</strong> {tutor.className}<br />
                        <strong>Mode:</strong> {tutor.mode}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );
};
