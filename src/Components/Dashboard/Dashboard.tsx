import { useEffect, useState } from 'react';
import type { Task, TaskFormData, FilterOptions, Status } from '../../types';
import { filterTasks, sortByDueDate, generateId} from '../../utils/taskUtils';
import TaskForm from '../TaskForm/TaskForm';
import TaskFilter from '../TaskFilter/TaskFilter';
import TaskList from '../TaskList/TaskList';

//previous tasks
const STORAGE_KEY = 'task-dashboard-tasks';

function loadTasks(): Task[] {
    try {

        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? (JSON.parse(raw) as Task[]) : [];

    } catch {
        return []; // start clean
    }
}


//main dashboard function
export default function Dashboard() {
    const [tasks, setTasks] = useState<Task[]>(loadTasks);
    const [filters, setFilters] = useState<FilterOptions>({
        status: 'all', priority: 'all', search: '',
    });


    //dark mode
    const [darkMode, setDarkMode] = useState(false);


    //need local storage for when tasks change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks]);


    //adding a task
    function addTask(data: TaskFormData) {
        const newTask: Task = {
            id: generateId(), ...data, status: 'todo'
        };
        setTasks((prev) => [newTask, ...prev]);
    }

    //changing a status
    function changeStatus(id: string, status: Status) {
        setTasks((prev) =>
            prev.map((t) => (t.id === id ? { ...t, status } : t))
        );
    }


    //delete task
    function deleteTask(id: string) {
        setTasks((prev) => prev.filter((t) => t.id !== id));
    }


    //data we need
    const visibleTasks = sortByDueDate(filterTasks(tasks, filters));
    const stats = {
        total: tasks.length,
        todo: tasks.filter((t) => t.status === 'todo').length,
        inProgress: tasks.filter((t) => t.status === 'in-progress').length,
        done: tasks.filter((t) => t.status === 'done').length,
    };

    //rendered
    return (
        <div className="dashboard">
            <header>
                <h1>Task Dashboard</h1>
                <button onClick={() => setDarkMode((d) => !d)}>
                    {darkMode ? 'Light' : 'Dark'}
                </button>
            </header>

            <section className="stats">
                <span>Total: {stats.total}</span>
                <span>To Do: {stats.todo}</span>
                <span>In Progress: {stats.inProgress}</span>
                <span>Done: {stats.done}</span>
            </section>

            <TaskForm onAddTask={addTask} />
            <TaskFilter filters={filters} onChange={setFilters} />
            <TaskList task={visibleTasks} onChangeStatus={changeStatus} onDelete={deleteTask}
            />
        </div>
    );
}
