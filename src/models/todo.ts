export interface Todo {
  duoDate: Date;
  description: string;
  id: string;
  isDone: boolean;
  title: string;
  updateStatus?: {
    status: number;
    statusText: string;
  };
}
