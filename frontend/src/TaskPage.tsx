import { useEffect, useState } from "react"
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
    <div>
      {task !== null &&
        <h1>{task.name}</h1>}
    </div>
  )
}

export default TaskPage;
