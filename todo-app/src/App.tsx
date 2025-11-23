import { useState, useMemo } from "react";
import { Layout } from "./components/layout/Layout";
import { TodoForm } from "./features/todo/TodoForm";
import { TodoList } from "./features/todo/TodoList";
import { TodoKanban } from "./features/todo/TodoKanban";
import { TodoFilters } from "./features/todo/TodoFilters";
import { useTodos } from "./hooks/useTodos";
import { Button } from "./components/ui/Button";
import { LayoutGrid, List } from "lucide-react";
import type { TodoStatus, TodoFilter } from "./types";

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, updateTodo } = useTodos();
  const [view, setView] = useState<"list" | "kanban">("list");
  const [filters, setFilters] = useState<TodoFilter>({
    status: "all",
    priority: "all",
    search: "",
  });

  const handleStatusUpdate = (id: string, status: TodoStatus) => {
    updateTodo(id, { status });
  };

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      const matchesSearch =
        !filters.search ||
        todo.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        todo.description?.toLowerCase().includes(filters.search.toLowerCase());

      const matchesPriority =
        filters.priority === "all" || todo.priority === filters.priority;

      return matchesSearch && matchesPriority;
    });
  }, [todos, filters]);

  return (
    <Layout>
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">My Tasks</h2>
            <p className="text-muted-foreground">
              Manage your tasks efficiently and stay organized.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 p-1 dark:border-gray-800">
            <Button
              variant={view === "list" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setView("list")}
            >
              <List className="mr-2 h-4 w-4" />
              List
            </Button>
            <Button
              variant={view === "kanban" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setView("kanban")}
            >
              <LayoutGrid className="mr-2 h-4 w-4" />
              Board
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <TodoForm onSubmit={addTodo} />
          <TodoFilters filters={filters} onFilterChange={setFilters} />
        </div>

        <div className="space-y-4">
          {view === "list" ? (
            <>
              <h3 className="text-xl font-semibold tracking-tight">
                Tasks ({filteredTodos.length})
              </h3>
              <TodoList
                todos={filteredTodos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            </>
          ) : (
            <TodoKanban
              todos={filteredTodos}
              onUpdateStatus={handleStatusUpdate}
              onDelete={deleteTodo}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

export default App;
