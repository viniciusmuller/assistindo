import { Link, useParams } from "react-router-dom"
import BlankSlate from "./ui/BlankSlate"
import { Project, ProjectId, Task } from "./services/trabalhando-service"
import TaskCard from "./TaskCard"

interface ProjectBoardProps {
  project: Project
}

function ProjectBoard(props: ProjectBoardProps) {
  const { projectId } = useParams()

  const todoTasks = props.project.tasks.filter(t => t.status == "todo")
  const doingTasks = props.project.tasks.filter(t => t.status == "doing")
  const doneTasks = props.project.tasks.filter(t => t.status == "done")

  return (
    <div className='w-full space-y-2'>
      <div className="w-full flex space-x-4 justify-around">
        <div className="flex flex-col w-1/3">
          <h1>TODO</h1>
          <TaskList projectId={projectId!} tasks={todoTasks} />
        </div>

        <div className="flex flex-col w-1/3">
          <h1>DOING</h1>
          <TaskList projectId={projectId!} tasks={doingTasks} />
        </div>

        <div className="flex flex-col w-1/3">
          <h1>DONE</h1>
          <TaskList projectId={projectId!} tasks={doneTasks} />
        </div>
      </div>
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
