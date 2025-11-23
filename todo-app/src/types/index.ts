export type Priority = "low" | "medium" | "high";
export type TodoStatus = "todo" | "in-progress" | "done";

export interface Todo {
    id: string;
    title: string;
    description?: string;
    status: TodoStatus;
    priority: Priority;
    dueDate?: string; // ISO string
    createdAt: string; // ISO string
    tags: string[];
}

export interface TodoFilter {
    status?: TodoStatus | "all";
    priority?: Priority | "all";
    search?: string;
}
