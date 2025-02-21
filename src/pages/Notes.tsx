
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Notes = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-primary mb-8">Study Notes</h1>
          <p className="text-xl text-gray-600 mb-8">
            Access your study materials and notes here. Coming soon!
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Notes;
