
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@/config/api";
import { fetchWithInterceptor, apiPost } from "@/utils/apiInterceptor";
import { toast } from "sonner";

export function useTeacherProfile() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<any>(null);
  
  // Form data state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    designation: "",
    skills: "",
    instituteName: "",
    courseName: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    grade: "",
    credentialUrl: "",
    companyName: "",
    position: "",
    jobType: "Full-Time",
    startDateExp: "",
    endDateExp: "",
    description: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    subject: "",
    board: "",
    className: "",
    weeklySessions: "",
    costPerSession: "",
    currency: "USD",
    aboutCourse: "",
    language: "English",
    mode: "Online",
    courseThumbnail: "",
    profilePic: "",
    boards: "",
    classes: "",
    subjects: ""
  });

  // Check for user authentication
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role?.toLowerCase() !== "teacher") {
      navigate("/");
      return;
    }

    setUser(parsedUser);
  }, [navigate]);

  // Profile data query
  const { 
    data: profileData, 
    isLoading: isProfileLoading 
  } = useQuery({
    queryKey: ["tutorProfile"],
    queryFn: async () => {
      try {
        const response = await fetchWithInterceptor(API_ENDPOINTS.tutors.getTutorProfile, { requiresAuth: true });
        return await response.json();
      } catch (error) {
        console.error("Error fetching tutor profile:", error);
        return null;
      }
    },
    enabled: !!user
  });

  // Education data query
  const { 
    data: educationList = [], 
    isLoading: isEducationLoading, 
    refetch: refetchEducation 
  } = useQuery({
    queryKey: ["tutorEducation"],
    queryFn: async () => {
      try {
        const response = await fetchWithInterceptor(API_ENDPOINTS.tutors.educationList, { requiresAuth: true });
        const data = await response.json();
        return data?.data || [];
      } catch (error) {
        console.error("Error fetching education:", error);
        return [];
      }
    },
    enabled: !!user
  });

  // Experience data query
  const { 
    data: experienceList = [], 
    isLoading: isExperienceLoading, 
    refetch: refetchExperience 
  } = useQuery({
    queryKey: ["tutorExperience"],
    queryFn: async () => {
      try {
        const response = await fetchWithInterceptor(API_ENDPOINTS.tutors.experienceList, { requiresAuth: true });
        const data = await response.json();
        return data?.data || [];
      } catch (error) {
        console.error("Error fetching experience:", error);
        return [];
      }
    },
    enabled: !!user
  });

  // Courses data query
  const { 
    data: coursesList = [], 
    isLoading: isCoursesLoading, 
    refetch: refetchCourses 
  } = useQuery({
    queryKey: ["tutorCourses"],
    queryFn: async () => {
      try {
        const response = await fetchWithInterceptor(API_ENDPOINTS.courses.tutorCourses, { requiresAuth: true });
        const data = await response.json();
        return data?.data || data || [];
      } catch (error) {
        console.error("Error fetching courses:", error);
        return [];
      }
    },
    enabled: !!user
  });

  // Update form data when profile data loads
  useEffect(() => {
    if (profileData?.data) {
      setFormData(prev => ({
        ...prev,
        name: profileData.data.name || "",
        email: profileData.data.emailId || "",
        phone: profileData.data.phoneNumber || "",
        location: profileData.data.location || "",
        bio: profileData.data.aboutMe || "",
        designation: profileData.data.currentDesignation || "",
        skills: profileData.data.skills || "",
        boards: profileData.data.boards || "",
        classes: profileData.data.classes || "",
        subjects: profileData.data.subjects || ""
      }));
    }
  }, [profileData]);

  // Form input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // File input change handler
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'profilePic' | 'courseThumbnail' | 'credentialUrl') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          [field]: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // API handlers
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await apiPost(API_ENDPOINTS.tutors.getTutorProfile, {
        name: formData.name,
        aboutMe: formData.bio,
        currentDesignation: formData.designation,
        skills: formData.skills,
        location: formData.location,
        phoneNumber: formData.phone
      }, { requiresAuth: true });
      
      if (response.ok) {
        toast.success("Profile updated successfully");
        queryClient.invalidateQueries({ queryKey: ["tutorProfile"] });
        return true;
      } else {
        toast.error("Failed to update profile");
        return false;
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating profile");
      return false;
    }
  };

  const handleAddEducation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const educationData = {
        instituteName: formData.instituteName,
        courseName: formData.courseName,
        fieldOfStudy: formData.fieldOfStudy,
        startTime: formData.startDate,
        endTime: formData.endDate,
        grade: formData.grade,
        credentialUrl: formData.credentialUrl
      };
      
      const response = await apiPost(API_ENDPOINTS.tutors.addEducation, educationData, { requiresAuth: true });
      
      if (response.ok) {
        toast.success("Education added successfully");
        queryClient.invalidateQueries({ queryKey: ["tutorEducation"] });
        setFormData(prev => ({
          ...prev,
          instituteName: "",
          courseName: "",
          fieldOfStudy: "",
          startDate: "",
          endDate: "",
          grade: "",
          credentialUrl: ""
        }));
        return true;
      } else {
        toast.error("Failed to add education");
        return false;
      }
    } catch (error) {
      console.error("Error adding education:", error);
      toast.error("An error occurred while adding education");
      return false;
    }
  };

  const handleAddExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const experienceData = {
        organisationName: formData.companyName,
        designation: formData.position,
        type: formData.jobType,
        startTime: formData.startDateExp,
        endTime: formData.endDateExp
      };
      
      const response = await apiPost(API_ENDPOINTS.tutors.addExperience, experienceData, { requiresAuth: true });
      
      if (response.ok) {
        toast.success("Experience added successfully");
        queryClient.invalidateQueries({ queryKey: ["tutorExperience"] });
        setFormData(prev => ({
          ...prev,
          companyName: "",
          position: "",
          jobType: "Full-Time",
          startDateExp: "",
          endDateExp: "",
          description: ""
        }));
        return true;
      } else {
        toast.error("Failed to add experience");
        return false;
      }
    } catch (error) {
      console.error("Error adding experience:", error);
      toast.error("An error occurred while adding experience");
      return false;
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error("New passwords don't match");
      return false;
    }
    
    try {
      const passwordData = {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        changePassword: true
      };
      
      const response = await apiPost(API_ENDPOINTS.auth.profile, passwordData, { requiresAuth: true });
      
      if (response.ok) {
        toast.success("Password changed successfully");
        setFormData(prev => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: ""
        }));
        return true;
      } else {
        toast.error("Failed to change password");
        return false;
      }
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("An error occurred while changing password");
      return false;
    }
  };

  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const courseData = {
        subject: formData.subject,
        board: formData.board,
        className: formData.className,
        weeklySessions: formData.weeklySessions,
        costPerSessions: formData.costPerSession,
        currency: formData.currency,
        aboutThisCourse: formData.aboutCourse,
        language: formData.language,
        mode: formData.mode,
        courseThumbnail: formData.courseThumbnail
      };
      
      const response = await apiPost(API_ENDPOINTS.courses.create, courseData, { requiresAuth: true });
      
      if (response.ok) {
        toast.success("Course added successfully");
        queryClient.invalidateQueries({ queryKey: ["tutorCourses"] });
        setFormData(prev => ({
          ...prev,
          subject: "",
          board: "",
          className: "",
          weeklySessions: "",
          costPerSession: "",
          currency: "USD",
          aboutCourse: "",
          language: "English",
          mode: "Online",
          courseThumbnail: ""
        }));
        return true;
      } else {
        toast.error("Failed to add course");
        return false;
      }
    } catch (error) {
      console.error("Error adding course:", error);
      toast.error("An error occurred while adding course");
      return false;
    }
  };

  const handleProfilePicUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.profilePic) {
      toast.error("Please select an image");
      return false;
    }
    
    try {
      const response = await apiPost(API_ENDPOINTS.tutors.uploadProfilePic, {
        profilePic: formData.profilePic
      }, { requiresAuth: true });
      
      if (response.ok) {
        toast.success("Profile picture updated successfully");
        queryClient.invalidateQueries({ queryKey: ["tutorProfile"] });
        setFormData(prev => ({ ...prev, profilePic: "" }));
        return true;
      } else {
        toast.error("Failed to update profile picture");
        return false;
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
      toast.error("An error occurred while updating profile picture");
      return false;
    }
  };

  const handleSaveOfferings = async (offeringData: { boards: string, classes: string, subjects: string }) => {
    try {
      const response = await apiPost(API_ENDPOINTS.tutors.addTutorBasicDetails, {
        currentDesignation: profileData?.data?.currentDesignation || "",
        shortBio: profileData?.data?.shortBio || "",
        aboutMe: profileData?.data?.aboutMe || "",
        skills: profileData?.data?.skills || "",
        WhatsAppNumber: profileData?.data?.WhatsAppNumber || "",
        FullAdddress: profileData?.data?.FullAdddress || "",
        boards: offeringData.boards,
        classes: offeringData.classes,
        subjects: offeringData.subjects
      }, { requiresAuth: true });
      
      if (response.ok) {
        toast.success("Offerings updated successfully");
        queryClient.invalidateQueries({ queryKey: ["tutorProfile"] });
        return true;
      } else {
        toast.error("Failed to update offerings");
        return false;
      }
    } catch (error) {
      console.error("Error updating offerings:", error);
      toast.error("An error occurred while updating offerings");
      return false;
    }
  };

  const deleteEducation = async (id: string) => {
    try {
      const response = await apiPost(API_ENDPOINTS.tutors.deleteEducation, { educationId: id }, { requiresAuth: true });
      
      if (response.ok) {
        toast.success("Education deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["tutorEducation"] });
        return true;
      } else {
        toast.error("Failed to delete education");
        return false;
      }
    } catch (error) {
      console.error("Error deleting education:", error);
      toast.error("An error occurred while deleting education");
      return false;
    }
  };

  const deleteExperience = async (id: string) => {
    try {
      const response = await apiPost(API_ENDPOINTS.tutors.deleteExperience, { experienceId: id }, { requiresAuth: true });
      
      if (response.ok) {
        toast.success("Experience deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["tutorExperience"] });
        return true;
      } else {
        toast.error("Failed to delete experience");
        return false;
      }
    } catch (error) {
      console.error("Error deleting experience:", error);
      toast.error("An error occurred while deleting experience");
      return false;
    }
  };

  const deleteCourse = async (id: string) => {
    try {
      const response = await apiPost(API_ENDPOINTS.courses.deleteCourse, { courseId: id }, { requiresAuth: true });
      
      if (response.ok) {
        toast.success("Course deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["tutorCourses"] });
        return true;
      } else {
        toast.error("Failed to delete course");
        return false;
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error("An error occurred while deleting course");
      return false;
    }
  };

  return {
    user,
    profileData,
    educationList,
    experienceList,
    coursesList,
    formData,
    setFormData,
    isProfileLoading,
    isEducationLoading,
    isExperienceLoading,
    isCoursesLoading,
    refetchEducation,
    refetchExperience,
    refetchCourses,
    handleChange,
    handleFileInputChange,
    handleProfileUpdate,
    handleAddEducation,
    handleAddExperience,
    handlePasswordChange,
    handleAddCourse,
    handleProfilePicUpdate,
    handleSaveOfferings,
    deleteEducation,
    deleteExperience,
    deleteCourse
  };
}
