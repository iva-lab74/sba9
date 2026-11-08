import type { TaskItemProps } from "../../types";
import { formatDate, isOverdue } from "../../utils/taskUtils";

//props and callback
export default function TaskItem ({ task, onChangeStatus, onDelete }: TaskItemProps) {
    const overdue = isOverdue(task);

    return (
        <li className={`task-item ${overdue ? 'overdue' : ''}`}>
          <div className="task-main">
            <h3 className= {task.status === 'done' ? 'done' : ''}> {task.title}</h3>
            {task.description && <p>{task.description}</p>}

            <small>
              Priority: <strong>{task.priority}</strong> &middot; Due: {formatDate(task.dueDate)}
              {overdue && 'Overdue'}
            </small>
          </div>

          <div className="task-actions">
            <select value={task.status} onChange={(e) => onChangeStatus(task.id, e.target.value as any)} aria-label="Change status">
                <option value="todo">To Do</option>
                <option value="in-progress">In progress</option>
                <option value="done">Done</option>
            </select>
            <button onClick={() => onDelete(task.id)}>Delete</button>

          </div>

        </li>
    );
}

//&middot= '.'