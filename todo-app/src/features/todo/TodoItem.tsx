import { format } from "date-fns";
import { Trash2, CheckCircle, Circle, Calendar, Tag } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card, CardContent } from "../../components/ui/Card";
import type { Todo } from "../../types";
import { cn } from "../../lib/utils";

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
    const priorityColors = {
        low: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
        medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    };

    return (
        <Card className="group transition-all hover:shadow-md">
            <CardContent className="flex items-start gap-4 p-4">
                <button
                    onClick={() => onToggle(todo.id)}
                    className="mt-1 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                >
                    {todo.status === "done" ? (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : (
                        <Circle className="h-6 w-6" />
                    )}
                </button>

                <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                        <h3
                            className={cn(
                                "font-medium leading-none",
                                todo.status === "done" && "text-gray-500 line-through"
                            )}
                        >
                            {todo.title}
                        </h3>
                        <span
                            className={cn(
                                "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                                priorityColors[todo.priority]
                            )}
                        >
                            {todo.priority}
                        </span>
                    </div>

                    {todo.description && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {todo.description}
                        </p>
                    )}

                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                        {todo.dueDate && (
                            <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>{format(new Date(todo.dueDate), "MMM d, yyyy")}</span>
                            </div>
                        )}

                        {todo.tags.length > 0 && (
                            <div className="flex items-center gap-2">
                                {todo.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="flex items-center gap-1 rounded-md bg-gray-100 px-1.5 py-0.5 dark:bg-gray-800"
                                    >
                                        <Tag className="h-3 w-3" />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(todo.id)}
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                >
                    <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
            </CardContent>
        </Card>
    );
}
