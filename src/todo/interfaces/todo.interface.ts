export interface Todo {
  title: string;
  status: string;
  index: number;
  previousIndex: number | undefined;
  containerToDelete: string | undefined;
}
