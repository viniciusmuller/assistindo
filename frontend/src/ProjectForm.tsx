import { useForm } from "react-hook-form";
import { Project, ProjectInputs } from "./services/trabalhando-service";
import Button from "./ui/Button";
import Input from "./ui/Input";

interface TaskFormProps {
  project?: Project,
  handleSubmit: (_: ProjectInputs) => Promise<void>
}

function TaskForm(props: TaskFormProps) {
  const { register, handleSubmit } = useForm<ProjectInputs>();

  return (
    <form className="space-y-3" onSubmit={handleSubmit(props.handleSubmit)}>
      <div className="flex justify-between">
        <div className="space-x-2">
          <label>Name</label>
          <Input type="text" defaultValue={props.project?.name} size={50} {...register("name")} />
        </div>

        <div className="space-x-2">
          <label className="text-xl">
            Hourly value
          </label>
          <Input type="number" step="0.01" {...register("hour_value")} defaultValue={props.project?.hour_value} />
        </div>
      </div>
      <div>
        <label>Currency prefix</label>
        <Input defaultValue={props.project?.currency_prefix} {...register("currency_prefix")} />
      </div>
      <Button text="Submit" type="submit" classes="border border-black hover:bg-gray-200" />
    </form>
  )
}

export default TaskForm
