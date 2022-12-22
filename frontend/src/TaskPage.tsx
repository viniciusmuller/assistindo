import { useCallback, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Project, Task, trabalhandoService, WorkSpan } from "./services/trabalhando-service"
import { toast } from 'react-hot-toast'
import { Breadcrumb, BreadcrumbHome, BreadcrumbItem } from "./ui/Breadcrumb"
import { BsChevronRight } from "react-icons/bs"
import { FaPencilAlt } from "react-icons/fa"
import Input from "./ui/Input"
import ReactMarkdown from "react-markdown"
import Button from "./ui/Button"
import WorkSpanCard from "./WorkSpanCard"
import BlankSlate from "./ui/BlankSlate"

function TaskPage() {
  const { projectId, taskId } = useParams()
  const [task, setTask] = useState<Task | null>(null)
  const [project, setProject] = useState<Project | null>(null)
  const [workSpans, setWorkSpans] = useState<WorkSpan[]>([])

  const fetchData = useCallback(async () => {
    const project = await trabalhandoService.getProjectById(Number(projectId))
    setProject(project)
    const task = await trabalhandoService.getTaskById(Number(taskId))
    setTask(task)
    const workSpans = await trabalhandoService.getTaskWorkSpans(task.id)
    setWorkSpans(workSpans)
  }, [projectId, taskId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const createWorkSpan = () => {
    const span = {
      task_id: Number(taskId!),
      start_date: new Date().toISOString(),
      end_date: new Date().toISOString(),
      description: "foo"
    }
    const promise = trabalhandoService.createWorkSpan(span);

    toast.promise(
      promise,
      {
        loading: 'Registering work span...',
        success: <b>Succesfully registered work span!</b>,
        error: <b>Could not register work span.</b>,
      }
    );

    promise.then((span) => setWorkSpans([...workSpans, span]))
  }

  const deleteWorkSpan = async (span: WorkSpan) => {
    const promise = trabalhandoService.deleteWorkSpan(span.id);

    toast.promise(
      promise,
      {
        loading: 'Deleting work span...',
        success: <b>Succesfully deleted work span!</b>,
        error: <b>Could not delete work span.</b>,
      }
    );

    promise.then(() => setWorkSpans(workSpans.filter(ws => ws.id != span.id)))
  }


  return (
    <div className="p-4 space-y-4">
      {task !== null && project !== null &&
        <>
          <Breadcrumb>
            <BreadcrumbHome />
            <BsChevronRight />
            <BreadcrumbItem>
              <Link to={`/projects/${project.id}`}>
                <span>{project.name}</span>
              </Link>
            </BreadcrumbItem>
            <BsChevronRight />
            <BreadcrumbItem>
              <span>{task.name}</span>
            </BreadcrumbItem>
          </Breadcrumb>
          <div className="w-full border rounded-lg space-y-2 p-4">
            <div className="flex justify-between">
              <Input type="text" defaultValue={task.name} name="name" size={50} />
              <div className="space-x-2">
                <label className="text-xl" htmlFor="status-select">
                  Status
                </label>
                {/* TODO: use "value" instead of "selected" */}
                <select name="status-select">
                  <option selected={task.status == "todo"}>TODO</option>
                  <option selected={task.status == "doing"}>DOING</option>
                  <option selected={task.status == "done"}>DONE</option>
                </select>
              </div>
            </div>
            <hr className="my-2" />
            <div className="flex">
              <div className="w-1/2 flex flex-col items-start">
                <div className='flex justify-between w-full'>
                  <h2 className="text-2xl font-bold">Description</h2>
                  <button className="p-2 mr-4 rounded-full border shadow w-fit hover:bg-gray-200">
                    {/* TODO: make this toggleable between a textarea for editing and markdown (use eye and pencil icon ) */}
                    <FaPencilAlt />
                  </button>
                </div>
                <article className="prose grow mt-2">
                  <ReactMarkdown>
                    {task.description}
                  </ReactMarkdown>
                </article>
                <Button text="Update" classes="border border-black hover:bg-gray-200" />
              </div>
              <div className="w-1/2">
                <h2 className="text-2xl font-bold mb-2">Work Spans</h2>
                <div className="space-y-2">
                  <div className="p-2 border rounded space-y-2">
                    <div className="flex space-x-8">
                      <div className="flex space-x-2 items-center">
                        <label> Start date </label>
                        <Input type="datetime-local" name="datetime" />
                      </div>
                      <div className="flex space-x-2 items-center grow">
                        <label> End date </label>
                        <Input type="datetime-local" name="datetime" />
                      </div>
                      <div className="space-x-2 flex items-center">
                        <Button onClick={createWorkSpan} text="Submit" classes="border border-black hover:bg-gray-200" />
                      </div>
                    </div>
                    <div className="flex space-x-2 items-center grow">
                      <label> Description </label>
                      <Input type="text" name="description" size={44} />
                    </div>
                  </div>
                  {workSpans != null && workSpans.length > 0 ? workSpans.map(span => (
                    <WorkSpanCard onDelete={deleteWorkSpan} key={span.id} workSpan={span} />
                  )) : <BlankSlate />}
                </div>
              </div>
            </div>
          </div>
        </>
      }
    </div >
  )
}

export default TaskPage;
