
import { useState } from "react";

export function useProfileModals() {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddEducationOpen, setIsAddEducationOpen] = useState(false);
  const [isAddExperienceOpen, setIsAddExperienceOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [isUploadPhotoOpen, setIsUploadPhotoOpen] = useState(false);
  
  return {
    isEditProfileOpen,
    setIsEditProfileOpen,
    isAddEducationOpen,
    setIsAddEducationOpen,
    isAddExperienceOpen,
    setIsAddExperienceOpen,
    isChangePasswordOpen,
    setIsChangePasswordOpen,
    isAddCourseOpen,
    setIsAddCourseOpen,
    isUploadPhotoOpen,
    setIsUploadPhotoOpen
  };
}
