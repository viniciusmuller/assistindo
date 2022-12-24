import toast from "react-hot-toast";
import { BsChevronRight } from "react-icons/bs";
import { useNavigate, } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { ProjectInputs, trabalhandoService } from "./services/trabalhando-service";
import { Breadcrumb, BreadcrumbHome, BreadcrumbItem } from "./ui/Breadcrumb";

function CreateTaskPage() {
  let navigate = useNavigate();

  const createProject = async (data: ProjectInputs) => {
    const promise = trabalhandoService.createProject(data);

    toast.promise(
      promise,
      {
        loading: 'Creating the project...',
        success: <b>Succesfully created project!</b>,
        error: <b>Could not create project.</b>,
      }
    );

    promise.then(project => {
      navigate(`/projects/${project.id}`)
    })
  }

  return (
    <div className="p-4 space-y-4">
      <Breadcrumb>
        <BreadcrumbHome />
        <BsChevronRight />
        <BreadcrumbItem>
          <span>New Project</span>
        </BreadcrumbItem>
      </Breadcrumb>
      <ProjectForm handleSubmit={createProject} />
    </div >
  )
}

export default CreateTaskPage

