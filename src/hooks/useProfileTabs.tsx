
import { useState } from "react";

export type TabValue = "about" | "education" | "experience" | "courses" | "offerings" | "security";

interface UseProfileTabsOptions {
  defaultTab?: TabValue;
}

interface UseProfileTabsResult {
  activeTab: TabValue;
  setActiveTab: (tab: TabValue | string) => void;
}

export function useProfileTabs({ defaultTab = "about" }: UseProfileTabsOptions = {}): UseProfileTabsResult {
  const [activeTab, setActiveTab] = useState<TabValue>(defaultTab);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value as TabValue);
  };
  
  return {
    activeTab,
    setActiveTab: handleTabChange
  };
}
