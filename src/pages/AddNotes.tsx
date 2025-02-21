
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddNotes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
      return;
    }

    const userData = JSON.parse(user);
    if (userData.role !== "teacher") {
      navigate("/notes");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-primary mb-8">Add New Notes</h1>
          <p className="text-xl text-gray-600 mb-8">
            Create and share new study materials with your students. Coming soon!
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AddNotes;
