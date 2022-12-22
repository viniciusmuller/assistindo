import { useEffect, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { useParams } from "react-router-dom";
import ProjectBoard from "./ProjectBoard";
import ProjectCard from "./ProjectCard";
import { Project, trabalhandoService } from "./services/trabalhando-service";
import { Breadcrumb, BreadcrumbHome, BreadcrumbItem, BreadcrumbProject } from "./ui/Breadcrumb";
import Button from "./ui/Button";

function ProjectPage() {
  const { projectId } = useParams()
  const [project, setProject] = useState<Project | null>(null)

  useEffect(() => {
    trabalhandoService.getProjectById(Number(projectId))
      .then(p => setProject(p))
  }, [])

  return (
    <div>
      {project !== null &&
        <div className="p-4 space-y-4">
          <Breadcrumb>
            <BreadcrumbHome />
            <BsChevronRight />
            <BreadcrumbItem>
              <span>{project.name}</span>
            </BreadcrumbItem>
          </Breadcrumb>
          {/* TODO: don't use project card component here 
            this will show different information (such as an options edit button, etc)
            and should not try to use or modify the existing project card
          */}
          <ProjectCard project={project} />
          <Button text="Create new task" classes="border border-black hover:bg-gray-200" />
          <ProjectBoard project={project} />
        </div>
      }
    </div>
  )
}

export default ProjectPage
