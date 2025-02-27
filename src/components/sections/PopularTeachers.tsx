import { useQuery } from '@tanstack/react-query';
import { Star } from 'lucide-react';
import { API_ENDPOINTS } from '@/config/api';

export const PopularTeachers = () => {
    const { data: tutors = [], isLoading, error } = useQuery({
        queryKey: ['topTutors'],
        queryFn: async () => {
            const response = await fetch(API_ENDPOINTS.tutors.list, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer', // Ensure token is included if needed
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch top tutors');
            }

            const data = await response.json();
            return data?.data || [];
        },
    });

    return (
        <div className="w-full bg-white py-16">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-2 bg-blue-100 rounded-full mb-4">
                <span className="text-blue-500">Popular Teachers</span>
              </div>
              <h2 className="text-3xl font-bold">Meet Our Expert Teachers</h2>
            </div>
    
            {/* Loading State */}
            {isLoading && <p className="text-center text-gray-600">Loading tutors...</p>}
            {error && <p className="text-center text-red-500">Failed to load tutors</p>}
    
            {/* Tutor Cards */}
            {!isLoading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {tutors.map((tutor) => (
                  <div key={tutor._id} className="bg-[#FFF5F5] rounded-xl overflow-hidden shadow-md">
                    <img
                      src={tutor.profilePic || 'https://via.placeholder.com/300'}
                      alt={tutor.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{tutor.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{tutor.currentDesignation}</p>
                      
                      <div className="flex items-center space-x-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        ))}
                        <span className="text-sm text-gray-600 ml-2">(N/A Reviews)</span>
                      </div>
    
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{tutor.weeklySessions} Sessions/Week</span>
                        <span className="text-sm text-gray-600">{tutor.costPerSessions} {tutor.currency}/Session</span>
                      </div>
    
                      <div className="mt-3 text-sm text-gray-500">
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