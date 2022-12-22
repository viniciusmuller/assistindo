import { FaPencilAlt } from 'react-icons/fa'
import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import { useParams } from "react-router-dom"
import BlankSlate from "./BlankSlate"
import { Task, trabalhandoService } from "./services/trabalhando-service"
import Button from "./ui/Button"
import WorkSpanCard from "./WorkSpanCard"
import Input from './ui/Input'

function TaskPage() {
  const { id } = useParams()
  const [task, setTask] = useState<Task | null>(null)

  useEffect(() => {
    trabalhandoService.getTaskById(Number(id))
      .then(t => setTask(t))
  }, [])

  return (
    <div className="p-8">
      {task !== null &&
        <div className="w-full border rounded-lg space-y-2 p-4">
          <div className="flex justify-between">
            <h1 className="text-4xl font-bold">{task.name}</h1>
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
                <button className="p-2 mr-4 rounded-full border shadow w-fit">
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
                      <Button text="Submit" classes="border border-black hover:bg-gray-200" />
                    </div>
                  </div>
                  <div className="flex space-x-2 items-center grow">
                    <label> Description </label>
                    <Input type="text" name="description" size={44} />
                  </div>
                </div>
                {task.work_spans != null && task.work_spans.length > 0 ? task.work_spans.map(span => (
                  <WorkSpanCard key={span.id} workSpan={span} />
                )) : <BlankSlate />}
              </div>
            </div>
          </div>
        </div>
      }
    </div >
  )
}

export default TaskPage;
