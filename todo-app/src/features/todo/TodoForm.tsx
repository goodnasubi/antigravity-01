import React, { useState } from "react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import type { Priority } from "../../types";

interface TodoFormProps {
    onSubmit: (
        title: string,
        description: string,
        priority: Priority,
        dueDate: string,
        tags: string[]
    ) => void;
    onCancel?: () => void;
}

export function TodoForm({ onSubmit, onCancel }: TodoFormProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState<Priority>("medium");
    const [dueDate, setDueDate] = useState("");
    const [tags, setTags] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        const tagList = tags
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t !== "");

        onSubmit(title, description, priority, dueDate, tagList);

        // Reset form
        setTitle("");
        setDescription("");
        setPriority("medium");
        setDueDate("");
        setTags("");
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Add New Task</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Title</label>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="What needs to be done?"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <Input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Add details..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Priority</label>
                            <select
                                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value as Priority)}
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Due Date</label>
                            <Input
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Tags (comma separated)</label>
                        <Input
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="Work, Personal, Urgent"
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        {onCancel && (
                            <Button type="button" variant="ghost" onClick={onCancel}>
                                Cancel
                            </Button>
                        )}
                        <Button type="submit">Add Task</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
