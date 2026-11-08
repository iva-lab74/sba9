import type { TaskFilterProps } from "../../types";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onChangeStatus, onDelete }: TaskListProps) {
    if (tasks.length === 0) {
        return <p className= "empty">No matching tasks.</p>;
    }

    return (
        <ul className="task-list">
            {tasks.map((task) => (
                <TaskItem task={task} onChangeStatus={onChangeStatus} onDelete={onDelete} />

            ))}
        
        </ul>
    );
}

