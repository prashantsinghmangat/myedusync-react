
import { toast } from "sonner";

export const logout = () => {
  // Clear user data from localStorage
  localStorage.removeItem('user');
  
  // Show toast notification
  toast.success("You have been logged out successfully");
  
  // Redirect to login page
  window.location.href = '/login';
};

export const isAuthenticated = (): boolean => {
  const user = localStorage.getItem('user');
  return !!user;
};

export const getToken = (): string | null => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user).token : null;
};
