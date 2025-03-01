
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { Note } from "@/types/notes";
import { API_ENDPOINTS } from '@/config/api';
import { SEO } from "@/components/SEO";
import { generateStructuredData } from "@/utils/seo";

import { Hero } from '@/components/sections/Hero';
import { Mission } from '@/components/sections/Mission';
import { Stats } from '@/components/sections/Stats';
import { PopularTeachers } from '@/components/sections/PopularTeachers';
import { Courses } from '@/components/sections/Courses';
import { Testimonials } from '@/components/sections/Testimonials';
import { FAQ } from '@/components/sections/FAQ';

import { BookOpen, Users, Award, Clock } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const { data: tutors = [] } = useQuery({
    queryKey: ['topTutors'],
    queryFn: async () => {
      const response = await fetch(API_ENDPOINTS.tutors.list, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch top tutors');
      }

      const data = await response.json();
      return data?.data || [];
    },
  });

  const { data: notes = [] } = useQuery({
    queryKey: ['latestNotes'],
    queryFn: async () => {
      const response = await fetch(API_ENDPOINTS.notes.list + '?page=0&limit=10', {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch latest notes');
      }

      const data = await response.json();
      return data?.data || [];
    },
  });

  const handleNoteClick = (note: Note) => {
    console.log("note data send: ", note);
    navigate(`/notes/${note._id}`, { state: { note } }); // Pass note in state
  };

  // Generate structured data for the organization
  const structuredData = generateStructuredData('Organization', {
    name: 'MyEduSync',
    url: 'https://myedusync.com',
    logo: 'https://myedusync.com/logo.png',
    description: 'MyEduSync provides personalized tutoring and educational resources for students.',
    sameAs: [
      'https://facebook.com/myedusync',
      'https://twitter.com/myedusync',
      'https://linkedin.com/company/myedusync'
    ]
  });

  const features = [
    {
      icon: <BookOpen className="w-6 h-6 text-primary" />,
      title: "Expert-Led Courses",
      description: "Learn from industry professionals with years of experience in their fields."
    },
    {
      icon: <Users className="w-6 h-6 text-secondary" />,
      title: "Community Support",
      description: "Join a community of learners and get help whenever you need it."
    },
    {
      icon: <Award className="w-6 h-6 text-accent" />,
      title: "Recognized Certificates",
      description: "Earn certificates that are recognized by top employers worldwide."
    },
    {
      icon: <Clock className="w-6 h-6 text-highlight" />,
      title: "Learn at Your Pace",
      description: "Access course materials 24/7 and learn at a schedule that works for you."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Online Tutoring & Educational Resources"
        description="MyEduSync offers personalized tutoring, expert teachers, and comprehensive study materials. Connect with top tutors and access quality educational resources today."
        structuredData={structuredData}
      />
      <Header />

      <main className="pt-1">
        <Hero />
        <Mission />
        <Stats />
        <PopularTeachers />
        <Courses />
      </main>

      <main className="flex-grow">
        {/* Latest Notes Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-secondary/20 text-secondary dark:text-secondary rounded-full text-sm font-medium mb-4">
                Latest Resources
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Latest Study Notes</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Access quality study materials prepared by our expert tutors to enhance your learning experience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {notes.map((note) => (
                <Card
                  key={note._id}
                  className="hover:shadow-lg transition-all cursor-pointer border border-gray-200 dark:border-gray-700 dark:bg-gray-800"
                  onClick={() => handleNoteClick(note)}
                >
                  <CardHeader>
                    {note.featuredImage && (
                      <img
                        src={note.featuredImage}
                        alt={note.title}
                        className="w-full h-48 object-cover rounded-t-lg mb-4"
                      />
                    )}
                    <CardTitle className="text-xl text-gray-900 dark:text-white">{note.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground dark:text-gray-400">By {note.author}</p>
                      <div className="flex flex-wrap gap-2">
                        {note.tags?.slice(0, 5).map((tag, index) => (
                          <span
                            key={index}
                            className="text-xs bg-primary/20 text-primary dark:text-primary px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="pt-2">
                        <p className="text-gray-700 dark:text-gray-300"><span className="font-medium">Subject:</span> {note.notesSubject}</p>
                        <p className="text-gray-700 dark:text-gray-300"><span className="font-medium">Class:</span> {note.notesClass}</p>
                        <p className="text-sm text-muted-foreground dark:text-gray-400">
                          Created: {new Date(note.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/notes')}
                className="border-primary text-primary hover:bg-primary hover:text-white dark:border-primary dark:text-primary dark:hover:bg-primary dark:hover:text-white"
              >
                View All Notes
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 px-6 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-accent/20 text-accent dark:text-accent rounded-full text-sm font-medium mb-4">
                Why Choose Us
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Features that make learning easier</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                We've designed our platform with features that enhance your learning experience and help you achieve your goals faster.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-600 rounded-lg flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Testimonials />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
