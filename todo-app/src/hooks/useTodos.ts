import { useLocalStorage } from "./useLocalStorage";
import type { Todo, TodoStatus, Priority } from "../types";

export function useTodos() {
    const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);

    const addTodo = (
        title: string,
        description?: string,
        priority: Priority = "medium",
        dueDate?: string,
        tags: string[] = []
    ) => {
        const newTodo: Todo = {
            id: crypto.randomUUID(),
            title,
            description,
            status: "todo",
            priority,
            dueDate,
            tags,
            createdAt: new Date().toISOString(),
        };
        setTodos([...todos, newTodo]);
    };

    const updateTodo = (id: string, updates: Partial<Todo>) => {
        setTodos(
            todos.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo))
        );
    };

    const deleteTodo = (id: string) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const toggleTodo = (id: string) => {
        setTodos(
            todos.map((todo) => {
                if (todo.id === id) {
                    const newStatus: TodoStatus =
                        todo.status === "done" ? "todo" : "done";
                    return { ...todo, status: newStatus };
                }
                return todo;
            })
        );
    };

    return {
        todos,
        setTodos,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleTodo,
    };
}
