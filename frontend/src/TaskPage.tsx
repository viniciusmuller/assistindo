import { useCallback, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Project, Task, TaskInputs, trabalhandoService, WorkSpan, WorkSpanInputs } from "./services/trabalhando-service"
import { toast } from 'react-hot-toast'
import { Breadcrumb, BreadcrumbHome, BreadcrumbItem } from "./ui/Breadcrumb"
import { BsChevronRight } from "react-icons/bs"
import Input from "./ui/Input"
import Button from "./ui/Button"
import WorkSpanCard from "./WorkSpanCard"
import BlankSlate from "./ui/BlankSlate"
import { useForm } from "react-hook-form"

function TaskPage() {
  const { projectId, taskId } = useParams()
  const [task, setTask] = useState<Task | null>(null)
  const [project, setProject] = useState<Project | null>(null)
  const [workSpans, setWorkSpans] = useState<WorkSpan[]>([])

  // TODO: move workspan form to different component
  const { register, handleSubmit, formState: { errors } } = useForm<WorkSpanInputs>();
  // const taskForm = { register, handleSubmit, formState: { errorsTask } } = useForm<TaskInputs>();
  const taskForm = useForm<TaskInputs>();

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

  const createWorkSpan = (data: WorkSpanInputs) => {
    const span = {
      task_id: Number(taskId!),
      start_date: data.startDate,
      end_date: data.endDate,
      description: data.description
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
          <form className="w-full border rounded-lg space-y-2 p-4" onSubmit={taskForm.handleSubmit(updateTask)}>
            <div className="flex justify-between">
              <input type="text" defaultValue={task.name} size={50} {...taskForm.register("name")} />
              <div className="space-x-2">
                <label className="text-xl" htmlFor="status-select">
                  Status
                </label>
                <select {...taskForm.register("status")} defaultValue={task.status}>
                  <option value="todo">TODO</option>
                  <option value="doing">DOING</option>
                  <option value="done">DONE</option>
                </select>
              </div>
            </div>
            <hr className="my-2" />
            <div className="flex">
              <div className="w-1/2 flex flex-col items-start">
                <h2 className="text-2xl font-bold">Description</h2>
                <div className="w-full h-full py-2 pr-5">
                  <textarea className="w-full min-h-full rounded" spellCheck={false} defaultValue={task.description} {...taskForm.register("description")}>
                  </textarea>
                </div>
                <Button text="Update" type="submit" classes="border border-black hover:bg-gray-200" />
              </div>
              <div className="w-1/2">
                <h2 className="text-2xl font-bold mb-2">Work Spans</h2>
                <div className="space-y-2">
                  <form
                    onSubmit={handleSubmit(createWorkSpan)} className="p-2 border rounded space-y-2">
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
                  {workSpans != null && workSpans.length > 0 ? workSpans.map(span => (
                    <WorkSpanCard onDelete={deleteWorkSpan} key={span.id} workSpan={span} />
                  )) : <BlankSlate />}
                </div>
              </div>
            </div>
          </form>
        </>
      }
    </div >
  )
}

function getCurrentDate() {
  return new Date().toISOString().slice(0, -8)
}

export default TaskPage;
