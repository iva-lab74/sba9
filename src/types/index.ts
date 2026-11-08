

export type Priority = 'low' | 'medium' | 'high';
export type Status = 'todo' | 'in-progress' | 'done';

//Typescripit interface declaration of a SAVED task
export interface Task {
    id: string;
    title: string;
    description: string;
    status: Status;
    priority: Priority;
    dueDate: string;
}

//What the form collects
export interface TaskFormData {
    title: string;
    description: string;
    priority: Priority;
    dueDate: string;
}

//default state of the filter 
export interface FilterOptions {
    status: Status | 'all';
    priority: Priority | 'all';
    search: string;
}

//props
export interface TaskItemProps {
    task: Task;
    onChangeStatus: (id: string, status: Status) => void;
    onDelete: (id: string) => void;
}

export interface TaskListProps {
    task: Task[];
    onChangeStatus: (id: string, status: Status) => void;
    onDelete: (id: string) => void;
}

export interface TaskFormProps {
    onAddTask: (data: TaskFormData) => void;
}

export interface TaskFilterProps {
    filters: FilterOptions;
    onChange: (filters: FilterOptions) => void;
}

//id information/ make a random number id crypto?
export function generateId(): string {
    return typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(35).slice(2)}`;
}