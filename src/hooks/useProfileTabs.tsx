
import { useState } from "react";

type TabValue = "about" | "education" | "experience" | "courses" | "offerings" | "security";

export function useProfileTabs(defaultTab: TabValue = "about") {
  const [activeTab, setActiveTab] = useState<TabValue>(defaultTab);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value as TabValue);
  };
  
  return {
    activeTab,
    setActiveTab: handleTabChange
  };
}
