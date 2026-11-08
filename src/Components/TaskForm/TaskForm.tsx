import { useState } from "react";
import type { TaskFormProps, TaskFormData } from "../../types";
import { validateTaskForm } from "../../utils/taskUtils";

//stable reference for REACT "loaded but empty"= EMPTY

const EMPTY: TaskFormData = { title: '', description: '', priority: 'medium', dueDate: '' };

export default function TaskForm({ onAddTask }: TaskFormProps) {
    const [form, setForm] = useState<TaskFormData>(EMPTY);
    const [errors, setErrors] = useState<Record<string, string>>({});

    //union cause target could be anything, only the test
    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) {
        const { name, value } = e.target;
        //only override the field that changed
        setForm((prev) => ({ ...prev, [name]: value }));
    }
    