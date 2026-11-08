import type { TaskFilterProps } from "../../types";

export default function TaskFilter({ filters, onChange }: TaskFilterProps) {
    //makes it type safe, only relates to key/value 
    function update<Key extends keyof typeof filters>(key: Key, value: (typeof filters)[Key]) {

        onChange({ ...filters, [key]: value });
    }

    const hasActiveFilters = filters.status !== 'all' || filters.priority !== 'all' || filters.search !== '';

    return (
        <div className="task-filter">
            <input type="search" placeholder="Search" value={filters.search} onChange={(e) => update('search', e.target.value)} />

            <select value={filters.status} onChange={(e) => update('status', e.target.value as any)}>
                <option value="all">All statuses</option>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>

            </select>

            <select value={filters.priority} onChange={(e) => update('priority', e.target.value as any)}>
                <option value="all">All priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>

            </select>
            
            //button
            {hasActiveFilters && (<button onClick={() => onChange({ status: 'all', priority: 'all', search: '' })}> Clear filter</button>
            )}
        </div>
    );
}