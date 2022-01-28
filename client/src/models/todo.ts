enum TodoStatus {
    TODO,
    DOING,
    DONE,
}

export interface Todo {
    id: number;
    task: string;
    status: TodoStatus;
}