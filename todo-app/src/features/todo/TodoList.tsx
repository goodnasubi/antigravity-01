import type { Todo } from "../../types";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
    todos: Todo[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
    if (todos.length === 0) {
        return (
            <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50 text-center dark:border-gray-800 dark:bg-gray-900/50">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    No tasks yet. Add one to get started!
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}
