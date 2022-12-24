import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsChevronRight } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Project, TaskInputs, trabalhandoService } from "./services/trabalhando-service";
import TaskForm from "./TaskForm";
import { Breadcrumb, BreadcrumbHome, BreadcrumbItem } from "./ui/Breadcrumb";

function CreateTaskPage() {
  const { projectId } = useParams()
  const [project, setProject] = useState<Project | null>(null)
  let navigate = useNavigate();

  useEffect(() => {
    trabalhandoService.getProjectById(projectId!)
      .then(project => setProject(project))
  }, [])

  const createTask = async (data: TaskInputs) => {
    if (projectId === undefined) {
      return;
    }

    const promise = trabalhandoService.createTask(projectId, data);

    toast.promise(
      promise,
      {
        loading: 'Creating task...',
        success: <b>Succesfully created task!</b>,
        error: <b>Could not create task.</b>,
      }
    );

    promise.then(task => {
      navigate(`/projects/${projectId}/tasks/${task.id}`)
    })
  }

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
          <span>New task</span>
        </BreadcrumbItem>
      </Breadcrumb>}
      <TaskForm handleSubmit={createTask} />
    </div>
  )
}

export default CreateTaskPage

