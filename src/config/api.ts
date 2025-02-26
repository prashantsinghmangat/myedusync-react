
const API_BASE_URL = 'https://api.myedusync.com';

export const API_ENDPOINTS = {
  notes: {
    list: `${API_BASE_URL}/getNotesLists`,
    detail: (id: string) => `${API_BASE_URL}/getNotes/${id}`,
    create: `${API_BASE_URL}/createNotes`,
  },
  tutors: {
    list: `${API_BASE_URL}/getTopTutorProfileWithLatestCourse`,
    detail: (id: string) => `${API_BASE_URL}/getTutorProfile/${id}`,
  },
  courses: {
    list: `${API_BASE_URL}/getCourses`,
    detail: (id: string) => `${API_BASE_URL}/getCourse/${id}`,
  },
  auth: {
    login: `${API_BASE_URL}/login`,
    register: `${API_BASE_URL}/register`,
    profile: `${API_BASE_URL}/profile`,
  }
};
