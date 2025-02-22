
export type Board = 'SelectBoard' | 'CBSE' | 'ICSE' | 'UPBoard';

export interface DataStructure {
  classes: number[];
  subjects: {
    [key: number]: string[];
  };
}

export interface Note {
  id: string;
  title: string;
  description: string;
  board: Board;
  class: number;
  subject: string;
  content: string;
  createdAt: string;
}
