import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import { useParams } from "react-router-dom"
import { Task, trabalhandoService } from "./services/trabalhando-service"

function TaskPage() {
  const { id } = useParams()
  const [task, setTask] = useState<Task | null>(null)

  useEffect(() => {
    trabalhandoService.getTaskById(Number(id))
      .then(t => setTask(t))
  }, [])

  return (
    <div className="p-8">
      {task !== null &&
        <div className="border rounded-lg space-y-2 p-4">
          <h1 className="text-4xl font-bold">{task.name}</h1>
          <div className="space-x-2">
            <label className="text-xl" htmlFor="status-select">
              Status
            </label>
            <select name="status-select">
              <option selected={task.status == "todo"}>TODO</option>
              <option selected={task.status == "doing"}>DOING</option>
              <option selected={task.status == "done"}>DONE</option>
            </select>
          </div>
          <hr className="my-2" />
          <article className="prose">
            <ReactMarkdown>
              {task.description}
            </ReactMarkdown>
          </article>
        </div>
      }
    </div>
  )
}

export default TaskPage;
