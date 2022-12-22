import { Link } from "react-router-dom"
import { Project } from "./services/trabalhando-service"
import TaskCard from "./TaskCard"

interface ProjectBoardProps {
  project: Project
}

function ProjectBoard(props: ProjectBoardProps) {
  const todoTasks = props.project.tasks.filter(t => t.status == "todo")
  const doingTasks = props.project.tasks.filter(t => t.status == "doing")
  const doneTasks = props.project.tasks.filter(t => t.status == "done")

  return (
    <div className='w-full space-y-2'>
      <div className="w-full flex space-x-4 justify-around">
        <div className="flex flex-col w-1/3 space-y-2">
          <h1>TODO</h1>
          {todoTasks.map(t => (
            <Link key={t.id} to={`/task/${t.id}`}>
              <TaskCard task={t} />
            </Link>
          ))}
        </div>

        <div className="flex flex-col w-1/3 space-y-2">
          <h1>DOING</h1>
          {doingTasks.map(t => (
            <Link key={t.id} to={`/task/${t.id}`}>
              <TaskCard task={t} />
            </Link>
          ))}
        </div>

        <div className="flex flex-col w-1/3 space-y-2">
          <h1>DONE</h1>
          {doneTasks.map(t => (
            <Link key={t.id} to={`/task/${t.id}`}>
              <TaskCard task={t} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectBoard
