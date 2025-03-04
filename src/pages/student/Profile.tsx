
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { StudentProfileContent } from "@/components/profile/student/StudentProfileContent";
import { StudentProfileModals } from "@/components/profile/student/StudentProfileModals";
import { toast } from "sonner";

const StudentProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    school: "",
    grade: "",
    bio: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role?.toLowerCase() !== "student") {
      navigate("/");
      return;
    }

    setUser(parsedUser);
    
    // In a real app, you'd fetch profile data from an API here
    setFormData({
      ...formData,
      name: "John Smith",
      email: parsedUser.email || "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      location: "New York, USA",
      school: "Riverdale High School",
      grade: "11th Grade",
      bio: "I'm a dedicated student focused on STEM subjects with a particular interest in physics and mathematics. I enjoy solving complex problems and participating in science competitions."
    });
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd send this data to your API
    toast.success("Profile updated successfully");
    setIsEditProfileOpen(false);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error("New passwords don't match");
      return;
    }
    
    // In a real app, you'd send this data to your API
    toast.success("Password changed successfully");
    setIsChangePasswordOpen(false);
    setFormData({
      ...formData,
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: ""
    });
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-primary mb-6">My Profile</h1>

            <StudentProfileContent 
              formData={formData}
              setIsEditProfileOpen={setIsEditProfileOpen}
              setIsChangePasswordOpen={setIsChangePasswordOpen}
            />

            <StudentProfileModals
              isEditProfileOpen={isEditProfileOpen}
              isChangePasswordOpen={isChangePasswordOpen}
              setIsEditProfileOpen={setIsEditProfileOpen}
              setIsChangePasswordOpen={setIsChangePasswordOpen}
              formData={formData}
              handleChange={handleChange}
              handleProfileUpdate={handleProfileUpdate}
              handlePasswordChange={handlePasswordChange}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StudentProfile;
