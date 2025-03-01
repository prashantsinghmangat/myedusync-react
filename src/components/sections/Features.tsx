
import { BookOpen, Users, Award, Clock } from 'lucide-react';

export const Features = () => {
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
  );
};
