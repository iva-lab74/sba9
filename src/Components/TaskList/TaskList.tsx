import type { TaskListProps } from "../../types";
import TaskItem from "./TaskItem";

export default function TaskList({ task, onChangeStatus, onDelete }: TaskListProps) {
    if (task.length === 0) {
        return <p className= "empty">No matching tasks.</p>;
    }

    return (
        <ul className="task-list">
            {task.map((task) => (
                <TaskItem task={task} onChangeStatus={onChangeStatus} onDelete={onDelete} key={task.id} />

            ))}
        
        </ul>
    );
}

//need a key