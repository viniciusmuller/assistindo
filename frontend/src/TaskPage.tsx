import { useCallback, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Project, Task, TaskInputs, trabalhandoService, WorkSpan, WorkSpanInputs } from "./services/trabalhando-service"
import { toast } from 'react-hot-toast'
import { Breadcrumb, BreadcrumbHome, BreadcrumbItem } from "./ui/Breadcrumb"
import { BsChevronRight } from "react-icons/bs"
import Button from "./ui/Button"
import WorkSpanCard from "./WorkSpanCard"
import BlankSlate from "./ui/BlankSlate"
import { useForm } from "react-hook-form"
import TaskForm from "./TaskForm"

function TaskPage() {
  const { projectId, taskId } = useParams()
  const [task, setTask] = useState<Task | null>(null)
  const [project, setProject] = useState<Project | null>(null)
  const [workSpans, setWorkSpans] = useState<WorkSpan[]>([])

  // TODO: move workspan form to different component
  const { register, handleSubmit, formState: { errors } } = useForm<WorkSpanInputs>();

  const fetchData = useCallback(async () => {
    const project = await trabalhandoService.getProjectById(projectId!)
    setProject(project)
    const task = await trabalhandoService.getTaskById(taskId!)
    setTask(task)
    const workSpans = await trabalhandoService.getTaskWorkSpans(task.id)

    setWorkSpans(workSpans.sort((ws1, ws2) => {
      if (new Date(ws1.end_date) >= new Date(ws2.end_date)) {
        return -1
      } else {
        return 1
      }
    }))
  }, [projectId, taskId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const createWorkSpan = (data: WorkSpanInputs) => {
    const promise = trabalhandoService.createWorkSpan(taskId, data);

    toast.promise(
      promise,
      {
        loading: 'Registering work span...',
        success: <b>Succesfully registered work span!</b>,
        error: <b>Could not register work span.</b>,
      }
    );

    promise.then((span) => setWorkSpans([span, ...workSpans]))
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

  const updateTask = async (data: TaskInputs) => {
    if (taskId === undefined) {
      return;
    }

    const promise = trabalhandoService.updateTask(taskId, data);

    toast.promise(
      promise,
      {
        loading: 'Deleting work span...',
        success: <b>Succesfully updated task!</b>,
        error: <b>Could not update task.</b>,
      }

    );

    promise.then((task) => setTask(task))
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
          {/* TODO: remove form nesting */}
          <div className="flex border rounded-lg space-x-4 p-4">
            <div className="w-1/2">
              <TaskForm handleSubmit={updateTask} task={task} />
            </div>
            <div className="w-1/2">
              <details>
                <summary>Register work span</summary>
                <form onSubmit={handleSubmit(createWorkSpan)} className="p-2 border rounded space-y-2 mb-6">
                  <div className="flex space-x-8">
                    <div className="flex space-x-2 items-center">
                      <label> Start date </label>
                      {/* TODO: figure out how to use our custom input in here */}
                      {/* TODO: make default respect timezone but exclude seconds precision */}
                      <input type="datetime-local" {...register("startDate")} defaultValue={getCurrentDate()} />
                    </div>
                    <div className="flex space-x-2 items-center grow">
                      <label> End date </label>
                      <input type="datetime-local" {...register("endDate")} defaultValue={getCurrentDate()} />
                    </div>
                    <div className="space-x-2 flex items-center">
                      <Button type="submit" text="Submit" classes="border border-black hover:bg-gray-200" />
                    </div>
                  </div>
                  <div className="flex space-x-2 items-center grow">
                    <label> Description </label>
                    <input type="text" size={44} {...register("description", { required: true })} />
                    {errors.description && <p>Cannot be blank</p>}
                  </div>
                </form>
              </details>
              {/* <h2 className="text-2xl font-bold mb-2">Work Spans</h2> */}
              <div className="space-y-2">
                {workSpans != null && workSpans.length > 0 ? workSpans.map(span => (
                  <WorkSpanCard onDelete={deleteWorkSpan} key={span.id} workSpan={span} />
                )) : <BlankSlate />}
              </div>
            </div>
            <hr className="my-2" />
          </div>
        </>
      }
    </div >
  )
}

function getCurrentDate() {
  return new Date().toISOString().slice(0, -8)
}

export default TaskPage;
