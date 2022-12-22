import { Task } from "./services/trabalhando-service";

interface TaskCardProps {
  task: Task
}

function TaskCard(props: TaskCardProps) {
  return (
    <div className="w-full border rounded bg-white hover:bg-gray-100">
      <div className="px-8 py-4">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-3xl font-bold">{props.task.name}</h1>
        </div>
        <div className="w-full flex items-center justify-between">
          <h2 className="text-xl font-bold">10 hours spent so far</h2>
          <p>Click for details</p>
        </div>
      </div>
    </div>
  )
}

export default TaskCard;
