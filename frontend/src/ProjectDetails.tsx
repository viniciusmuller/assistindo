import { useEffect, useState } from "react"
import { BsChevronRight } from "react-icons/bs"
import { Link, useParams } from "react-router-dom"
import { Project, trabalhandoService } from "./services/trabalhando-service"
import { Breadcrumb, BreadcrumbHome, BreadcrumbItem } from "./ui/Breadcrumb"
import Button from "./ui/Button"

enum Tab {
  Details,
  Insights,
  Reporting,
}

function ProjectDetails() {
  const { projectId } = useParams()

  const [project, setProject] = useState<Project | null>(null)
  const [currentTab, setCurrentTab] = useState<Tab>(Tab.Details)

  useEffect(() => {
    trabalhandoService.getProjectById(projectId!)
      .then(p => setProject(p))
  }, [])

  console.log(currentTab)

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
                onClick={() => setCurrentTab(Tab.Reporting)}
              >
                Reporting
              </button>
            </li>
          </ul>
          <div className="p-4 border rounded-b-lg ">
            {currentTab == Tab.Details &&
              <form className="flex flex-col space-y-2">
                <div>
                  <label className="block">Name</label>
                  <input type="text" defaultValue={project.name} />
                </div>
                <div>
                  <label className="block">Hourly value</label>
                  <input type="text" defaultValue={project.hour_value} />
                </div>
                <div>
                  <label className="block">Currency prefix</label>
                  <input type="text" defaultValue={project.currency_prefix} />
                </div>

                <div>
                  <Button type="submit" text="Submit" classes={"border rounded hover:bg-gray-200"} />
                </div>
              </form>
            }
            {currentTab == Tab.Insights &&
              <p>Insights</p>
            }
            {currentTab == Tab.Reporting &&
              <p>Reporting</p>
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
