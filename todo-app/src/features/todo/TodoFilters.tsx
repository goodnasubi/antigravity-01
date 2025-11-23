import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import type { TodoFilter, Priority } from "../../types";
import { Search, X } from "lucide-react";

interface TodoFiltersProps {
    filters: TodoFilter;
    onFilterChange: (filters: TodoFilter) => void;
}

export function TodoFilters({ filters, onFilterChange }: TodoFiltersProps) {
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onFilterChange({ ...filters, search: e.target.value });
    };

    const handlePriorityChange = (priority: Priority | "all") => {
        onFilterChange({ ...filters, priority });
    };

    const clearFilters = () => {
        onFilterChange({ search: "", priority: "all", status: "all" });
    };

    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                    placeholder="Search tasks..."
                    value={filters.search || ""}
                    onChange={handleSearchChange}
                    className="pl-9"
                />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
                <div className="flex items-center rounded-lg border border-gray-200 p-1 dark:border-gray-800">
                    {(["all", "low", "medium", "high"] as const).map((p) => (
                        <Button
                            key={p}
                            variant={filters.priority === p ? "secondary" : "ghost"}
                            size="sm"
                            onClick={() => handlePriorityChange(p)}
                            className="capitalize"
                        >
                            {p}
                        </Button>
                    ))}
                </div>
                {(filters.search || filters.priority !== "all") && (
                    <Button variant="ghost" size="icon" onClick={clearFilters}>
                        <X className="h-4 w-4" />
                    </Button>
                )}
            </div>
        </div>
    );
}
