import { useForm } from "react-hook-form";
import { Task, TaskInputs } from "./services/trabalhando-service";
import Button from "./ui/Button";

interface TaskFormProps {
  task?: Task
  handleSubmit: (_: TaskInputs) => Promise<void>
}

function TaskForm(props: TaskFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<TaskInputs>();

  return (
    <form className="space-y-3" onSubmit={handleSubmit(props.handleSubmit)}>
      <div className="flex justify-between">
        <input type="text" defaultValue={props.task?.name} size={50} {...register("name")} />
        <div className="space-x-2">
          <label className="text-xl" htmlFor="status-select">
            Status
          </label>
          <select {...register("status")} defaultValue={props.task?.status}>
            <option value="todo">TODO</option>
            <option value="doing">DOING</option>
            <option value="done">DONE</option>
          </select>
        </div>
      </div>
      <div>
        <label>Description</label>
        <textarea className="w-full h-[500px] rounded" spellCheck={false} defaultValue={props.task?.description} {...register("description")} />
      </div>
      <Button text="Update" type="submit" classes="border border-black hover:bg-gray-200" />
    </form>
  )
}

export default TaskForm
