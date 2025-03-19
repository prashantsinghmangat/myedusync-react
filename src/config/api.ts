
const API_BASE_URL = 'https://api.myedusync.com';

export const API_ENDPOINTS = {
  notes: {
    list: `${API_BASE_URL}/getNotesLists`,
    detail: (id: string) => `${API_BASE_URL}/getNote/${id}`,
    create: `${API_BASE_URL}/createNotes`,
  },
  tutors: {
    list: `${API_BASE_URL}/getTopTutorProfileWithLatestCourse`,
    getTutorProfile: `${API_BASE_URL}/getTutorProfile`,
    detail: (id: string) => `${API_BASE_URL}/getTutorProfile/${id}`,
    educationList: `${API_BASE_URL}/allTutorEducationList`,
    experienceList: `${API_BASE_URL}/allTutorExperienceList`,
    find: `${API_BASE_URL}/find-tutor`,
    getTutorList: `${API_BASE_URL}/getTutorList`,
    uploadProfilePic: `${API_BASE_URL}/uploadTutorProfilePic`,
    updateEducation: `${API_BASE_URL}/updateTutorEducation`,
    updateExperience: `${API_BASE_URL}/updateTutorExperience`,
    addEducation: `${API_BASE_URL}/addTutorEducation`,
    addExperience: `${API_BASE_URL}/addTutorExperience`,
    deleteEducation: `${API_BASE_URL}/deleteTutorEducation`,
    deleteExperience: `${API_BASE_URL}/deleteTutorExperience`,
    addTutorBasicDetails: `${API_BASE_URL}/addTutorBasicDetails`,
  },
  courses: {
    list: `${API_BASE_URL}/courses`,
    detail: (id: string) => `${API_BASE_URL}/courses/${id}`,
    create: `${API_BASE_URL}/createCourse`,
    tutorCourses: `${API_BASE_URL}/allTutorsCoursesList`,
    updateCourse: `${API_BASE_URL}/updateCourse`,
    deleteCourse: `${API_BASE_URL}/deleteCourse`,
  },
  auth: {
    login: `${API_BASE_URL}/login`,
    register: `${API_BASE_URL}/register`,
    profile: `${API_BASE_URL}/profile`,
    verifyOtp: `${API_BASE_URL}/verifyOtp`, 
  },
  blog: {
    list: `${API_BASE_URL}/blogs`,
    detail: (id: string) => `${API_BASE_URL}/blogs/${id}`,
    byTag: (tag: string) => `${API_BASE_URL}/blogs/tag/${tag}`,
    byAuthor: (authorId: string) => `${API_BASE_URL}/blogs/author/${authorId}`,
  }
};
