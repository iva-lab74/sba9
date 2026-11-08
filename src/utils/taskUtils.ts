import type { Task, FilterOptions, TaskFormData } from "../types";
//filtering
export function filterTasks(tasks: Task[], filters: FilterOptions): Task[] {
    return tasks.filter((task) => {
        const matchesStatus = filters.status === 'all' || task.status === filters.status;

        const matchesPriority = filters.priority === 'all' || task.priority === filters.priority;

        const query = filters.search.toLowerCase().trim();
        const matchesSearch = query === '' || task.title.toLowerCase().includes(query) || task.description.toLowerCase().includes(query);

        return matchesStatus && matchesPriority && matchesSearch;
    });
}

