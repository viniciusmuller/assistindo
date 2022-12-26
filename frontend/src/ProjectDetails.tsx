import { useEffect, useState } from "react"
import { BsChevronRight } from "react-icons/bs"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Project, ProjectInputs, trabalhandoService } from "./services/trabalhando-service"
import { Breadcrumb, BreadcrumbHome, BreadcrumbItem } from "./ui/Breadcrumb"
import ProjectReporting from "./ProjectReporting"
import ProjectForm from "./ProjectForm"
import toast from "react-hot-toast"
import Button from "./ui/Button"

enum Tab {
  Details,
  Insights,
  Reporting,
}

function ProjectDetails() {
  const { projectId } = useParams()
  const navigate = useNavigate()

  const [project, setProject] = useState<Project | null>(null)
  const [currentTab, setCurrentTab] = useState<Tab>(Tab.Details)

  const updateProject = async (data: ProjectInputs) => {
    const promise = trabalhandoService.updateProject(projectId!, data);

    toast.promise(
      promise,
      {
        loading: 'Updating the project...',
        success: <b>Succesfully updated project!</b>,
        error: <b>Could not update project.</b>,
      }
    );

    promise.then(project => setProject(project))
  }

  const deleteProject = async () => {
    if (project === null) {
      return
    }

    if (confirm(`Delete project "${project.name}"? This cannot be undone.`)) {
      const promise = trabalhandoService.deleteProject(project.id);
      toast.promise(
        promise,
        {
          loading: 'Deleting the project...',
          success: <b>Succesfully deleted project!</b>,
          error: <b>Could not delete project.</b>,
        }
      );

      await promise;
      navigate("/");
    }
  }

  useEffect(() => {
    trabalhandoService.getProjectById(projectId!)
      .then(p => setProject(p))
  }, [])

  return (
    <div className="p-4 space-y-4">
      {project !== null && <Breadcrumb>
        <BreadcrumbHome />
        <BsChevronRight />
        <BreadcrumbItem>
          <Link to={`/projects/${project.id}`}>
            <span>{project.name}</span>
          </Link>
        </BreadcrumbItem>
        <BsChevronRight />
        <BreadcrumbItem>
          <span>Details</span>
        </BreadcrumbItem>
      </Breadcrumb>}
      {project != null &&
        <div>
          <ul className="flex">
            <li>
              <button
                onClick={() => setCurrentTab(Tab.Details)}
                className={getTabStyle(currentTab, Tab.Details)}
              >
                Details
              </button>
            </li>
            <li>
              <button
                className={getTabStyle(currentTab, Tab.Insights)}
                onClick={() => setCurrentTab(Tab.Insights)}
              >
                Insights
              </button>
            </li>
            <li>
              <button
                className={getTabStyle(currentTab, Tab.Reporting)}
                onClick={() => setCurrentTab(Tab.Reporting)} >
                Reporting
              </button>
            </li>
          </ul>
          <div className="p-4 border rounded-b-lg">
            {currentTab == Tab.Details &&
              <div>
                <h2 className="text-2xl my-2">Project configuration</h2>
                <ProjectForm project={project} handleSubmit={updateProject} />
                <h2 className="text-2xl my-2">Danger zone</h2>
                <Button classes="bg-red-400 border border-black hover:bg-red-600" onClick={deleteProject}>
                  Delete project
                </Button>
              </div>
            }
            {currentTab == Tab.Insights &&
              <p>Insights</p>
            }
            {currentTab == Tab.Reporting &&
              <ProjectReporting />
            }
          </div>
        </div>}
    </div >
  )
}
function getTabStyle(currentTab: Tab, targetTab: Tab) {
  if (currentTab == targetTab) {
    return "-mb-px mr-1 bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-gray-700 font-semibold"
  } else {
    return "mr-1 bg-white inline-block py-2 px-4 text-gray-500 hover:text-gray-800 font-semibold"
  }
}


export default ProjectDetails
