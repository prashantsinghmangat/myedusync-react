
export interface Education {
  _id: {
    timestamp: string;
    counter: number;
  };
  instituteName: string;
  courseName: string;
  fieldOfStudy: string;
  startTime: string;
  endTime: string;
  grade: string;
  credentialUrl?: string;
}

export interface Experience {
  _id: {
    timestamp: string;
    counter: number;
  };
  organisationName: string;
  designation: string;
  type: string;
  startTime: string;
  endTime: string;
}

export interface Course {
  _id: string;
  subject: string;
  board: string;
  className: string;
  weeklySessions: string;
  costPerSessions: string;
  currency: string;
  aboutThisCourse?: string;
  language: string;
  mode: string;
  courseThumbnail?: string;
}
