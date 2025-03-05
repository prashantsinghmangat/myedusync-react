
import { useState } from "react";

export type ProfileTabType = "profile" | "education" | "experience" | "updateProfileImg" | "course" | null;

export const useProfileTabs = () => {
  const [activeTab, setActiveTab] = useState<string>("about");
  const [openModal, setOpenModal] = useState<ProfileTabType>(null);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return {
    activeTab,
    openModal,
    setActiveTab: handleTabChange,
    setOpenModal,
  };
};
