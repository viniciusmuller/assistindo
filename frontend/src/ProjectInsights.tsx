
import { useEffect, useState } from "react";
import { Project, Task, trabalhandoService } from "./services/trabalhando-service";

interface ProjectInsightsProps {
  project: Project
}

export default function ProjectInsights(props: ProjectInsightsProps) {
  const { project } = props
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    trabalhandoService.getProjectTasks(project.id).then(tasks => setTasks(tasks))
  })

  return (
    <div>
      <div>
        {/* TODO: idea: make the interval for the insights configurable */}
        <h2 className="text-2xl">
          Tasks with more hours spent on
        </h2>
        {tasks.map(task => (
          <ul>
            <li>
              <p>
                {task.name}
              </p>
              <p>
                {task.total_hours} hours
              </p>
            </li>
          </ul>
        ))}
      </div>
    </div>
  )
}
