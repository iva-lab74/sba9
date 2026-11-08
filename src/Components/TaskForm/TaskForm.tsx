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

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault(); 
        //not reloading the page
        const validationErrors = validateTaskForm(form);
        setErrors(validationErrors);
        //dont sumbit if theres any error
        if (Object.keys(validationErrors).length > 0) return;

        onAddTask(form);
        setForm(EMPTY);
    }
    //structure for all our factors
    return (
      <form onSubmit={handleSubmit} className="task-form">
        <div>
            <label htmlFor="title">Title</label>
            <input id="title" name="title" value={form.title} onChange={handleChange}/>
            {errors.title && <span className="error"> {errors.title}</span>}

        </div>

        <div>
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" value={form.description} onChange={handleChange} />

        </div>

        <div>
            <label htmlFor="priority">Priority</label>
            <select id="priority" name="priority" value={form.priority} onChange={handleChange}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
        </div>

        <div>
            <label htmlFor="dueDate">Due Date</label>
            <input type="date" id="dueDate" name="dueDate" value={form.dueDate} onChange={handleChange}/>
            {errors.dueDate && <span className="error">{errors.dueDate}</span>}
        </div>

        <button type="submit">Add Task</button>
      </form>
    );
}

