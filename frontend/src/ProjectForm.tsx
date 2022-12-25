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

      <div>
        <label className="block">Name</label>
        <Input type="text" {...register("name")} defaultValue={props.project?.name} />
      </div>
      <div>
        <label className="block">Hourly value</label>
        <Input type="text" {...register("hour_value")} step="0.01" defaultValue={props.project?.hour_value} />
      </div>
      <div>
        <label className="block">Currency prefix</label>
        <Input type="text" {...register("currency_prefix")} defaultValue={props.project?.currency_prefix} />
      </div>

      <Button type="submit" classes="border rounded hover:bg-gray-200">
        Submit
      </Button>
    </form >
  )
}

export default TaskForm
