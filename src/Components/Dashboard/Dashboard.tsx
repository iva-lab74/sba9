import { useEffect, useState } from 'react';
import type { Task, TaskFormData, FilterOptions, Status } from '../../types';
import { filterTasks, sortByDueDate } from '../../utils/taskUtils';
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


export default function Dashboard() {
    const [tasks, setTasks] = useState<Task[]>(loadTasks);
    const [filters, setFilters] = useState<FilterOptions>({
        status: 'all', priority: 'all', search: '',
    });


    
    //dark mode
    const [darkMode, setDarkMode] = useState(false);



//need local storage
