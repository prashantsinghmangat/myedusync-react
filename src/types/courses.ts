
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
  location?: string; // Adding this property to fix the TypeScript error
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

export interface Education {
  _id: {
    timestamp: number;
    counter: number;
    randomValue1: number;
    randomValue2: number;
  };
  teacherId: string;
  instituteName: string;
  courseName: string;
  fieldOfStudy: string;
  startTime: string;
  endTime: string;
  grade: string;
  credentialUrl: string;
}

export interface Experience {
  _id: {
    timestamp: number;
    counter: number;
    randomValue1: number;
    randomValue2: number;
  };
  teacherId: string;
  organisationName: string;
  designation: string;
  type: string;
  startTime: string;
  endTime: string;
}
