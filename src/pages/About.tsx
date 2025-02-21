
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <section className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-bold text-primary mb-6">Personalized Tutoring for All</h1>
            <p className="text-xl text-gray-600">
              At MyEduSync, our aim is to empower students by offering personalized tutoring that builds confidence and fosters academic excellence. We believe every student has the potential to succeed, and we are committed to providing the individual attention needed to overcome challenges and achieve their best.
            </p>
          </section>

          {/* Who We Are Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-primary mb-6">Who We Are</h2>
            <div className="bg-muted rounded-lg p-8">
              <p className="text-gray-600 mb-4">
                MyEduSync is a learning platform dedicated to helping students cultivate good habits, learn daily, and grow together in a community-driven environment. We believe in consistent learning, sharing knowledge, and building a foundation of strong habits that lead to success.
              </p>
              <p className="text-gray-600">
                Our mission is to create a supportive environment where students can connect with top tutors, access valuable resources, and stay motivated on their educational journey.
              </p>
            </div>
          </section>

          {/* What We Do Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-primary mb-8">What We Do</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Offer Quality Study Materials</h3>
                <p className="text-gray-600">
                  We provide comprehensive notes for all subjects, along with access to previous years' question papers to help students prepare effectively.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Connect Students with Top Tutors</h3>
                <p className="text-gray-600">
                  Our platform connects students with highly qualified tutors from around the world, offering personalized tutoring sessions tailored to each student's needs.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Monitor Learning Progress</h3>
                <p className="text-gray-600">
                  We track students' progress through regular quizzes and assessments, allowing us to evaluate teacher performance based on student outcomes.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Facilitate Resource Sharing</h3>
                <p className="text-gray-600">
                  We enable teachers and others to share valuable resources, creating a collaborative environment where everyone can learn and benefit.
                </p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-6">Join Us Today</h2>
            <p className="text-xl text-gray-600 mb-8">Be a part of a growing community of learners and educators.</p>
            <Button size="lg" className="bg-accent hover:bg-accent-hover">
              Get Started
            </Button>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
