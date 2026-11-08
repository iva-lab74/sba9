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

//sort which one is more important and is its due date (a - b)

const priorityRank: Record<string, number> = { high: 3, medium: 2, low: 1 };

export function sortByPriority(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => priorityRank[b.priority] - priorityRank[a.priority]);
}

export function sortByDueDate(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );
}

//"required"
export function validateTaskForm(data: TaskFormData): Record<string, string> {
    const errors: Record<string, string> ={};

    if (!data.title.trim()) errors.title = 'Title is required.';
    else if (data.title.length > 80) errors.title = 'Max 50 characters.';

    if (!data.dueDate) errors.dueDate = 'Due date is required.';
    else if (isNaN(new Date(data.dueDate).getTime())) {
        errors.dueDate = 'Invalid date.';
    }

    return errors;
}