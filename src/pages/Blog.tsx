
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    id: 1,
    title: "The Future of Online Learning",
    excerpt: "Discover how technology is shaping the future of education and creating new opportunities for students worldwide.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
    date: "March 15, 2024",
    author: "Sarah Johnson",
    category: "Education Technology"
  },
  {
    id: 2,
    title: "Tips for Effective Study Habits",
    excerpt: "Learn proven strategies to improve your study habits and maximize your learning potential.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    date: "March 12, 2024",
    author: "David Chen",
    category: "Study Tips"
  },
  {
    id: 3,
    title: "The Power of Personalized Learning",
    excerpt: "Explore how customized learning approaches can lead to better educational outcomes.",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80",
    date: "March 10, 2024",
    author: "Emily Williams",
    category: "Education"
  }
];

const Blog = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8">
              Educational Insights
            </h1>
            <p className="text-xl text-gray-600 mb-12">
              Explore our latest articles on education, learning strategies, and student success.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article 
                  key={post.id} 
                  className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 duration-300"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="text-sm text-accent mb-2">{post.category}</div>
                    <h2 className="text-xl font-semibold mb-2 text-primary">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{post.author}</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <div className="px-6 pb-6">
                    <Button 
                      variant="outline" 
                      className="w-full hover:bg-accent hover:text-white transition-colors"
                    >
                      Read More
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
