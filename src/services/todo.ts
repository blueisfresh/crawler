export default interface Todo {
  id: number;
  Title: string;
  Description: string;
  DueTime?: Date | null;
  IsDone: boolean;
}
