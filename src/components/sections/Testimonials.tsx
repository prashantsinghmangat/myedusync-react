
import React from 'react';
import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';

export const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Thompson",
      role: "UX Designer",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      content: "The UI/UX Design Masterclass completely transformed my career. The instructors were incredibly knowledgeable and the course content was comprehensive and up-to-date.",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Web Developer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      content: "I've taken several online courses before, but MyEduSync's Web Development Bootcamp stands out. The project-based approach helped me build a strong portfolio that landed me my dream job.",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Chen",
      role: "Data Scientist",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      content: "The Data Science course was exactly what I needed to transition into tech. The community support and mentorship opportunities were invaluable throughout my learning journey.",
      rating: 4
    }
  ];

  return (
    <section className="py-16 px-6 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-highlight/20 text-highlight dark:text-highlight rounded-full text-sm font-medium mb-4">
            Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">What Our Students Say</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Don't just take our word for it. Hear from some of our successful students who have transformed their careers with MyEduSync.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <Card key={testimonial.id} className="p-6 shadow-md hover:shadow-lg transition-all dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < testimonial.rating ? 'text-accent fill-current' : 'text-gray-300 dark:text-gray-600'}`} 
                  />
                ))}
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-6">"{testimonial.content}"</p>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
