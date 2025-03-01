
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { generateStructuredData } from "@/utils/seo";

import { Hero } from '@/components/sections/Hero';
import { Mission } from '@/components/sections/Mission';
import { Stats } from '@/components/sections/Stats';
import { PopularTeachers } from '@/components/sections/PopularTeachers';
import { Courses } from '@/components/sections/Courses';
import { Testimonials } from '@/components/sections/Testimonials';
import { FAQ } from '@/components/sections/FAQ';
import { LatestNotes } from '@/components/sections/LatestNotes';
import { Features } from '@/components/sections/Features';

const Index = () => {
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
        <LatestNotes />
        <Features />
        <Testimonials />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
