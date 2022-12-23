import { Link, useParams } from "react-router-dom"
import BlankSlate from "./ui/BlankSlate"
import { Task, trabalhandoService } from "./services/trabalhando-service"
import TaskCard from "./TaskCard"
import { useEffect, useState } from "react"

function ProjectBoard() {
  const { projectId } = useParams()
  const [todoTasks, setTodoTasks] = useState<Task[] | null>(null)
  const [doingTasks, setDoingTasks] = useState<Task[] | null>(null)
  const [doneTasks, setDoneTasks] = useState<Task[] | null>(null)

  useEffect(() => {
    trabalhandoService.getProjectTasks(projectId!)
      .then(tasks => {
        setTodoTasks(tasks.filter(t => t.status == "todo"))
        setDoingTasks(tasks.filter(t => t.status == "doing"))
        setDoneTasks(tasks.filter(t => t.status == "done"))
      })
  }, [])

  return (
    <div className='w-full space-y-2'>
      {todoTasks !== null && doingTasks !== null && doneTasks !== null &&
        <div className="w-full flex space-x-4 justify-around">
          <div className="flex flex-col w-1/3">
            <h1 className="font-bold">TODO</h1>
            <TaskList projectId={projectId!} tasks={todoTasks} />
          </div>

          <div className="flex flex-col w-1/3">
            <h1 className="font-bold">DOING</h1>
            <TaskList projectId={projectId!} tasks={doingTasks} />
          </div>

          <div className="flex flex-col w-1/3">
            <h1 className="font-bold">DONE</h1>
            <TaskList projectId={projectId!} tasks={doneTasks} />
          </div>
        </div>}
    </div>
  )
}

interface TaskListProps {
  projectId: string,
  tasks: Task[]
}

function TaskList(props: TaskListProps) {
  return (
    <div className="space-y-2">
      {props.tasks.length > 0 ? props.tasks.map(t => (
        <div key={t.id}>
          <Link to={`/projects/${props.projectId}/tasks/${t.id}`}>
            <TaskCard task={t} />
          </Link>
        </div>
      )) : <BlankSlate />}
    </div>
  )
}

export default ProjectBoard
