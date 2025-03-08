
import { toast } from "sonner";

// Types for request configuration
interface RequestConfig extends RequestInit {
  requiresAuth?: boolean;
}

// Custom Fetch with interceptor for handling API responses and errors
export const fetchWithInterceptor = async (url: string, config: RequestConfig = {}) => {
  try {
    // Get the token from localStorage if exists
    const user = localStorage.getItem('user');
    const token = user ? JSON.parse(user).token : null;

    // Add auth headers if token exists and request requires auth
    const headers = {
      'Content-Type': 'application/json',
      ...config.headers,
    };

    if (config.requiresAuth && token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Make the request
    const response = await fetch(url, {
      ...config,
      headers,
    });

    // Handle unauthorized responses
    if (response.status === 401) {
      toast.error("Unauthorized: Your session has expired. Please log in again.");

      // Clear user data from localStorage
      localStorage.removeItem('user');

      // Redirect to login page
      window.location.href = '/login';

      throw new Error('Unauthorized');
    }
    
    if (response.status === 409) {
      const errorData = await response.json().catch(() => null);
      console.log("errorData: ", errorData);  
      toast.error(errorData?.data || "Conflict error: Course already exists", {
        duration: 10000, // 10 seconds
      });
      return response;
    }

    // Handle server error responses (500, 502, 503, etc.)
    if (response.status >= 500) {
      console.error(`Server error: ${response.status} ${response.statusText}`);
      toast.error("Server error. Please try again later or contact support if the issue persists.", {
        duration: 5000,
      });
      
      // For server errors, we'll return the response object to let the caller handle it
      // This will allow fallback UIs to be shown without crashing the app
      return response;
    }

    // Handle other error responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.message || `Error: ${response.status} ${response.statusText}`;

      toast.error(errorData?.message || "An error occurred");
      throw new Error(errorMessage);
    }

    return response;
  } catch (error) {
    console.log("response error: ", error);
    // Handle network errors or other exceptions
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';

    // Only show toast for errors that aren't already handled (like 401)
    if (errorMessage !== 'Unauthorized') {
      toast.error(errorMessage);
    }

    throw error;
  }
};

// Helper functions for common HTTP methods
export const apiGet = (url: string, config: RequestConfig = {}) => {
  return fetchWithInterceptor(url, { ...config, method: 'GET' });
};

export const apiPost = (url: string, data: any, config: RequestConfig = {}) => {
  return fetchWithInterceptor(url, {
    ...config,
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const apiPut = (url: string, data: any, config: RequestConfig = {}) => {
  return fetchWithInterceptor(url, {
    ...config,
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const apiDelete = (url: string, config: RequestConfig = {}) => {
  return fetchWithInterceptor(url, { ...config, method: 'DELETE' });
};
