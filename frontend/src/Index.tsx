import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import { Project, trabalhandoService } from "./services/trabalhando-service";

function Index() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    trabalhandoService.getProjects().then((projects) => setProjects(projects))
  }, [])


  return (
    <div className="p-4 space-y-4">
      {projects.map(p =>
        <div>
          <Link key={p.id} to={`/project/${p.id}`}>
            <ProjectCard project={p} />
          </Link>
        </div>
      )}
    </div>
  )
}

export default Index;
