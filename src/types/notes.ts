
export type Board = 'SelectBoard' | 'CBSE' | 'ICSE' | 'UPBoard';

export interface DataStructure {
  classes: number[];
  subjects: {
    [key: number]: string[];
  };
}

export interface Note {
  _id: string;
  title: string;
  notesBoard: string;
  notesClass: string;
  notesSubject: string;
  chapter: number;
  featuredImage: string;
  author: string;
  authorId: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  notesStatus: string;
  reviewBy: string;
}
