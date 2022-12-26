import { Project } from "./services/trabalhando-service"

interface ProjectCardProps {
  project: Project
}

function ProjectCard(props: ProjectCardProps) {
  const { project } = props
  return (
    <div key={project.id} className="w-full px-8 py-4 space-y-2 border rounded-lg bg-white hover:bg-gray-100">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-3xl font-bold">{project.name}</h1>
        <h2 className="text-xl font-bold">{parseFloat(project.total_hours).toFixed(2)} hours registered</h2>
      </div>
      <div className="w-full flex items-center justify-between">
        <div>
          <p className="text-lg">{project.in_progress_tasks} tasks in progress</p>
          <p className="text-lg">{project.pending_tasks} tasks pending</p>
        </div>
        <p className="text-lg">
          {project.paid ?
            `Hourly value: ${project.currency_prefix}${parseFloat(project.hour_value).toFixed(2)}`
            : "Unpaid project"
          }
        </p>
      </div>
    </div >
  )
}

export default ProjectCard;
