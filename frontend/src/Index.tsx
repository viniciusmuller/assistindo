import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import { Project, trabalhandoService } from "./services/trabalhando-service";
import Button from "./ui/Button";

function Index() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    trabalhandoService.getProjects().then((projects) => setProjects(projects))
  }, [])

  return (
    <div className="p-4 space-y-4">
      <Link to="/projects/new">
        <Button classes="border border-black hover:bg-gray-200">
          New project
        </Button>
      </Link>
      {projects.map(p =>
        <div key={p.id}>
          <Link to={`/projects/${p.id}`}>
            <ProjectCard project={p} />
          </Link>
        </div>
      )}
    </div>
  )
}

export default Index;
