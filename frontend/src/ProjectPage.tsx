import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectBoard from "./ProjectBoard";
import ProjectCard from "./ProjectCard";
import { Project, trabalhandoService } from "./services/trabalhando-service";

function ProjectPage() {
  const { id } = useParams()
  const [project, setProject] = useState<Project | null>(null)

  useEffect(() => {
    trabalhandoService.getProjectById(Number(id))
      .then(p => setProject(p))
  }, [])

  return (
    <div>
      {project !== null &&
        <div className="p-6">
          <ProjectCard project={project} />
          <div className="mt-4">
            <ProjectBoard project={project} />
          </div>
        </div>
      }
    </div>
  )
}

export default ProjectPage
