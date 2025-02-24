
export interface Course {
  _id: string;
  teacherId: string;
  subject: string;
  board: string;
  className: string;
  weeklySessions: string;
  costPerSessions: string;
  currency: string;
  aboutThisCourse: string;
  courseThumbnail: string;
  language: string;
  mode: string;
  createdAt: string;
  updatedAt: string;
}

export interface CourseDetail extends Course {
  profilePic: string;
  name: string;
  currentDesignation: string;
  location: string;
  aboutMe: string;
}
