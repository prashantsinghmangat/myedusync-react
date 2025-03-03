
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const BecomeTutor = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Work on your terms</h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">Become an online tutor.</h2>
            <p className="text-xl mb-8">Flexible, fulfilling and fits into your schedule</p>
            <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 text-lg px-8">
              APPLY NOW
            </Button>
          </div>
        </section>

        {/* Why online tutoring */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why online tutoring?</h2>
            <p className="text-lg text-center text-gray-700 max-w-3xl mx-auto mb-12">
              Online tutoring is the perfect job for students and recent graduates. You'll make money, gain CV-boosting skills, and get that warm fuzzy feeling of helping others.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <Card className="border-t-4 border-blue-500 shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Remote</h3>
                  <p className="text-sm uppercase text-blue-600 mb-4">LEARN MORE</p>
                  <p className="text-gray-600">All you need is a laptop and wifi. Plus no money spent on travel - sweet.</p>
                </CardContent>
              </Card>
              
              <Card className="border-t-4 border-green-500 shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Rewarding</h3>
                  <p className="text-sm uppercase text-green-600 mb-4">LEARN MORE</p>
                  <p className="text-gray-600">You'll be helping shape the education of school kids who need it most.</p>
                </CardContent>
              </Card>
              
              <Card className="border-t-4 border-purple-500 shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Well paid</h3>
                  <p className="text-sm uppercase text-purple-600 mb-4">LEARN MORE</p>
                  <p className="text-gray-600">Take home from £12-£52/hour, with no experience needed.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">How does MyTutor work?</h2>
            <p className="text-lg text-center text-gray-700 max-w-3xl mx-auto mb-8">
              Here's a peek at our online lesson space; it's where you'll be giving life-changing tuition to school kids who need it most. And it's all within reaching distance of the kettle!
            </p>
            
            <div className="relative rounded-lg overflow-hidden max-w-4xl mx-auto shadow-xl">
              <img 
                src="https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg.webp" 
                alt="Online lesson space" 
                className="w-full"
              />
              <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-40 transition-all">
                <div className="bg-white rounded-full p-4">
                  <Play className="h-12 w-12 text-blue-600" />
                </div>
              </button>
              <p className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                PLAY
              </p>
            </div>
            
            <p className="text-sm text-center text-gray-500 mt-4">
              Laptop showing online lessons space being used
            </p>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-blue-600">Share your skills with kids who really need it</h3>
                <p className="text-gray-600">
                  You'll be making a real difference by tutoring school kids who might not otherwise be able to afford a tutor like you.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-green-600">Earn while you study</h3>
                <p className="text-gray-600">
                  With the chance to take home from £11-£45 an hour, MyTutor pays more than your average uni job - and it doesn't involve mopping up beer…
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-purple-600">It's perfect for your CV</h3>
                <p className="text-gray-600">
                  You don't need any qualifications to join! Become a tutor and you'll develop your communication, planning, and organisation skills - all things your future employer will love.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">It's flexible, fulfilling and fits into your schedule</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Juggling university, part-time work, hobbies and a social life can be tricky. Luckily at MyTutor we make it easy to find online tutoring jobs, so you can work as much or as little as you like.
            </p>
            <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 text-lg px-8">
              APPLY NOW <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BecomeTutor;
