
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { useLoading } from "@/providers/LoadingProvider";
import { apiGet } from "@/utils/apiInterceptor";
import { API_ENDPOINTS } from "@/config/api";
import { toast } from "sonner";
import { useQuery } from '@tanstack/react-query';
import { TutorProfile } from "@/components/tutor/TutorProfile";
import { TutorSidebar } from "@/components/tutor/TutorSidebar";
import { generateStructuredData } from "@/utils/seo";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui";

const TutorDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setIsLoading } = useLoading();

  const tutorId = id || "67264f27f9dbdb4f90c7a062";

  const { data: tutorResponse, isLoading, error } = useQuery({
    queryKey: ['tutorProfile', tutorId],
    queryFn: async () => {
      try {
        console.log(`Fetching tutor profile: ${API_ENDPOINTS.tutors.getTutorProfile}/${tutorId}`);
        const response = await apiGet(`${API_ENDPOINTS.tutors.getTutorProfile}/${tutorId}`, {
          skipAuthRedirect: true,
        });
        
        if (!response.ok) {
          console.error(`Error fetching tutor data: ${response.status}`);
          if (response.status === 404) {
            return { isSuccess: false, data: null, message: "Tutor not found" };
          }
          
          return { isSuccess: false, data: null, message: "Failed to load tutor" };
        }
        
        const data = await response.json();
        console.log("Tutor data received:", data);
        return data;
      } catch (error) {
        console.error("Error fetching tutor data:", error);
        return { isSuccess: false, data: null, message: "Failed to load tutor profile" };
      }
    },
    retry: 1,
    retryDelay: 1000,
    refetchOnWindowFocus: false,
  });

  const tutorProfile = tutorResponse?.isSuccess ? tutorResponse.data : null;

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

  const tutorStructuredData = tutorProfile 
    ? generateStructuredData('Person', {
        name: tutorProfile.name,
        description: tutorProfile.shortBio || tutorProfile.aboutMe,
        image: tutorProfile.profilePic,
        jobTitle: tutorProfile.currentDesignation,
        alumniOf: tutorProfile.education?.map(edu => edu.instituteName).join(', ') || undefined,
        knowsAbout: tutorProfile.subjects,
        worksFor: tutorProfile.experience?.length 
          ? { '@type': 'Organization', name: tutorProfile.experience[0].organisationName }
          : undefined
      })
    : null;

  const showErrorUI = error || (tutorResponse && !tutorResponse.isSuccess);

  if (showErrorUI) {
    return (
      <>
        <SEO
          title="Tutor Not Found"
          description="The tutor profile you're looking for could not be found."
        />
        <Header />
        <main className="py-24 px-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
          <div className="max-w-4xl mx-auto text-center">
            <AlertTriangle className="mx-auto h-16 w-16 text-yellow-500 mb-4" />
            <h1 className="text-3xl font-bold mb-4">Tutor Profile Unavailable</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              {tutorResponse?.message || "We couldn't load this tutor's profile. It may have been removed or there's a temporary issue."}
            </p>
            <Button onClick={() => navigate('/find-tutor')} variant="default">
              Browse Available Tutors
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEO
        title={tutorProfile ? `${tutorProfile.name} - Tutor Profile` : "Tutor Profile"}
        description={tutorProfile?.shortBio || tutorProfile?.aboutMe || "View detailed information about this tutor."}
        structuredData={tutorStructuredData}
      />
      <Header />
      <main className="py-24 px-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-8 animate-pulse">
                <div className="md:w-1/3">
                  <div className="h-80 bg-gray-300 dark:bg-gray-700 rounded-lg mb-4"></div>
                  <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </div>
                <div className="md:w-2/3">
                  <div className="h-12 w-1/2 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-24 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : tutorProfile ? (
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <TutorSidebar tutorProfile={tutorProfile} />
              </div>
              <div className="md:w-2/3">
                <TutorProfile tutorProfile={tutorProfile} />
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">Tutor not found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We couldn't find the tutor you're looking for. They may have removed their profile.
              </p>
              <Button variant="orange" asChild>
                <Link to="/find-tutor">Browse All Tutors</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default TutorDetail;
