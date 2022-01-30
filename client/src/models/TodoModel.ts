export type TodoStatus = 'todo' | 'doing' | 'done';

export interface Todo {
    id: number;
    user: string;
    task: string;
    status: TodoStatus;
}
