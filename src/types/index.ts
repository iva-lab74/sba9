

export type Priority = 'low' | 'medium'| 'high';
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
export interface TaskFormData{
    title: string;
    description: string;
    priority: Priority;
    dueDate: string;
}