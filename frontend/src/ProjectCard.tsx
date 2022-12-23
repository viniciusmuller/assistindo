import { Project } from "./services/trabalhando-service"

interface ProjectCardProps {
  project: Project
}

function ProjectCard(props: ProjectCardProps) {
  return (
    <div key={props.project.id} className="w-full px-8 py-4 space-y-2 border rounded-lg bg-white hover:bg-gray-100">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-3xl font-bold">{props.project.name}</h1>
        <h2 className="text-xl font-bold">{props.project.hours_last_two_weeks} hours last two weeks</h2>
      </div>
      <div className="w-full flex items-center justify-between">
        <div>
          <p className="text-lg">9 tasks in progress</p>
          <p className="text-lg">2 tasks pending</p>
        </div>
        <p className="text-lg">Hourly value: {props.project.currency_prefix}{parseFloat(props.project.hour_value).toFixed(2)}</p>
      </div>
    </div>
  )
}

export default ProjectCard;
