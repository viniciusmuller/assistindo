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
          {/* TODO: don't use project card component here 
            this will show different information (such as an options edit button, etc)
            and should not try to use or modify the existing project card
          */}
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
