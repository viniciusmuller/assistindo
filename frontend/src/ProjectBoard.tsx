import { Link } from "react-router-dom"
import BlankSlate from "./BlankSlate"
import { Project, Task } from "./services/trabalhando-service"
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
        <div className="flex flex-col w-1/3">
          <h1>TODO</h1>
          <TaskList tasks={todoTasks} />
        </div>

        <div className="flex flex-col w-1/3">
          <h1>DOING</h1>
          <TaskList tasks={doingTasks} />
        </div>

        <div className="flex flex-col w-1/3">
          <h1>DONE</h1>
          <TaskList tasks={doneTasks} />
        </div>
      </div>
    </div>
  )
}

interface TaskListProps {
  tasks: Task[]
}

function TaskList(props: TaskListProps) {
  return (
    <div className="space-y-2">
      {props.tasks.length > 0 ? props.tasks.map(t => (
        <div>
          <Link key={t.id} to={`/task/${t.id}`}>
            <TaskCard task={t} />
          </Link>
        </div>
      )) : <BlankSlate />}
    </div>
  )
}

export default ProjectBoard
