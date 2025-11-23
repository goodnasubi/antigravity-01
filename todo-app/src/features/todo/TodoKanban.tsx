import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragStartEvent,
    type DragOverEvent,
    type DragEndEvent,
} from "@dnd-kit/core";
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import type { Todo, TodoStatus } from "../../types";
import { TodoItem } from "./TodoItem";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/Card";

interface TodoKanbanProps {
    todos: Todo[];
    onUpdateStatus: (id: string, status: TodoStatus) => void;
    onDelete: (id: string) => void;
}

const columns: { id: TodoStatus; title: string }[] = [
    { id: "todo", title: "To Do" },
    { id: "in-progress", title: "In Progress" },
    { id: "done", title: "Done" },
];

function SortableTodoItem({ todo, onDelete }: { todo: Todo; onDelete: (id: string) => void }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: todo.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="mb-3 touch-none">
            <TodoItem todo={todo} onToggle={() => { }} onDelete={onDelete} />
        </div>
    );
}

export function TodoKanban({ todos, onUpdateStatus, onDelete }: TodoKanbanProps) {
    const [activeId, setActiveId] = useState<string | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);
    };

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id as string;
        const overId = over.id as string;

        // Find the containers
        const activeTodo = todos.find((t) => t.id === activeId);

        if (!activeTodo) return;

        // If over a column directly
        if (columns.some((col) => col.id === overId)) {
            const overColumnId = overId as TodoStatus;
            if (activeTodo.status !== overColumnId) {
                // We don't update state here for smoother drag, 
                // but in a real app we might want to optimistically update.
                // For now, we rely on DragEnd.
            }
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveId(null);

        if (!over) return;

        const activeId = active.id as string;
        const overId = over.id as string;

        const activeTodo = todos.find((t) => t.id === activeId);
        if (!activeTodo) return;

        // Dropped over a column
        if (columns.some((col) => col.id === overId)) {
            const newStatus = overId as TodoStatus;
            if (activeTodo.status !== newStatus) {
                onUpdateStatus(activeId, newStatus);
            }
            return;
        }

        // Dropped over another item
        const overTodo = todos.find((t) => t.id === overId);
        if (overTodo) {
            if (activeTodo.status !== overTodo.status) {
                onUpdateStatus(activeId, overTodo.status);
            }
            // Reordering within the same column is not persisted in this simple version
            // but visual reordering is handled by SortableContext if we had an ordered list.
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {columns.map((col) => (
                    <div key={col.id} className="flex flex-col gap-4">
                        <Card className="bg-gray-50/50 dark:bg-gray-900/50">
                            <CardHeader className="p-4 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    {col.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 pt-2 min-h-[500px]">
                                <SortableContext
                                    id={col.id}
                                    items={todos.filter((t) => t.status === col.id).map((t) => t.id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    {todos
                                        .filter((t) => t.status === col.id)
                                        .map((todo) => (
                                            <SortableTodoItem key={todo.id} todo={todo} onDelete={onDelete} />
                                        ))}
                                </SortableContext>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>

            <DragOverlay>
                {activeId ? (
                    <div className="opacity-80 rotate-2 cursor-grabbing">
                        <TodoItem
                            todo={todos.find((t) => t.id === activeId)!}
                            onToggle={() => { }}
                            onDelete={() => { }}
                        />
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}
