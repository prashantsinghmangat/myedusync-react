
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-muted to-white py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center animate-fadeIn">
              <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
                Personalized Tutoring for Every Student
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Unlock your full potential with one-on-one tutoring tailored to your unique learning style.
              </p>
              <div className="flex justify-center gap-4">
                <Button size="lg" className="bg-accent hover:bg-accent-hover">
                  Get Started
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose MyEduSync?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-accent text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of students who have already transformed their academic performance with MyEduSync.
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-accent hover:bg-gray-100">
              Start Learning Today
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const features = [
  {
    title: "Personalized Learning Plans",
    description: "Custom-tailored study programs designed to match your unique learning style and goals.",
  },
  {
    title: "Expert Tutors",
    description: "Learn from experienced educators passionate about helping students succeed.",
  },
  {
    title: "Flexible Scheduling",
    description: "Book sessions at times that work best for you, with 24/7 availability.",
  },
];

export default Index;
