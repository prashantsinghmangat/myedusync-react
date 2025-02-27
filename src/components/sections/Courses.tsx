import { useQuery } from '@tanstack/react-query';
import { CircleCheck } from 'lucide-react';

export const Courses = () => {
  const baseUrl = 'https://api.myedusync.com/courses';

  const { data: courses = [], isLoading, error } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const response = await fetch(baseUrl, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer YOUR_TOKEN_HERE', // Add a valid token if required
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }

      const data = await response.json();
      return data?.data || [];
    },
  });

  return (
    <div className="w-full bg-[#FFF5F5] py-16">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="inline-block px-4 py-2 bg-orange-100 rounded-full mb-4">
              <span className="text-orange-500">Our Courses</span>
            </div>
            <h2 className="text-3xl font-bold">Explore Our Courses</h2>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search Courses"
              className="px-4 py-2 border rounded-lg"
            />
            <select className="px-4 py-2 border rounded-lg">
              <option>All Categories</option>
            </select>
          </div>
        </div>

        {/* Loading & Error States */}
        {isLoading && <p className="text-center text-gray-500">Loading courses...</p>}
        {error && <p className="text-center text-red-500">{error.message}</p>}

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div key={course._id} className="bg-white rounded-xl overflow-hidden shadow-lg">
                <img
                  src={course.courseThumbnail}
                  alt={course.subject}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <CircleCheck className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-500">
                      {course.board} - Class {course.className}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{course.subject}</h3>
                  <p className="text-sm text-gray-600 truncate">
                    {course.aboutThisCourse.length > 100
                      ? `${course.aboutThisCourse.slice(0, 100)}...`
                      : course.aboutThisCourse}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-gray-600">
                      {course.weeklySessions} sessions/week
                    </span>
                    <span className="text-orange-500 font-bold">
                      ${course.costPerSessions} {course.currency}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            !isLoading && <p className="text-center text-gray-500">No courses available.</p>
          )}
        </div>
      </div>
    </div>
  );
};
