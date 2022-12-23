import Button from "./ui/Button"
import Input from "./ui/Input";
import { WorkSpan } from "./services/trabalhando-service";

interface WorkSpanCardProps {
  workSpan: WorkSpan
  onDelete: ((_: WorkSpan) => Promise<void>)
}

function WorkSpanCard(props: WorkSpanCardProps) {
  const { workSpan: span } = props;

  const startDate = new Date(span.start_date).getTime()
  const endDate = new Date(span.end_date).getTime()

  // https://stackoverflow.com/a/13904120
  // get total seconds between the times
  let delta = Math.abs(endDate - startDate) / 1000;

  // calculate (and subtract) whole days
  const days = Math.floor(delta / 86400);
  delta -= days * 86400;

  // calculate (and subtract) whole hours
  const hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;

  // calculate (and subtract) whole minutes
  const minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;

  const handleDelete = async () => {
    if (confirm(`Delete work span with description: "${span.description}"?`)) {
      await props.onDelete(span)
    }
  }

  return (
    <div className="p-2 border rounded space-y-2">
      <div className="flex space-x-8">
        <div className="flex space-x-2 items-center">
          <label> Start date </label>
          <Input defaultValue={span.start_date.slice(0, -1)} type="datetime-local" name="datetime" />
        </div>
        <div className="flex space-x-2 items-center grow">
          <label> End date </label>
          <Input defaultValue={span.end_date.slice(0, -1)} type="datetime-local" name="datetime" />
        </div>
        <p>Worked for {`${padZero(hours)}:${padZero(minutes)}`}</p>
        <div className="space-x-2">
          <Button text="Update" classes="border border-black hover:bg-gray-200" />
          <Button text="Delete" onClick={handleDelete} classes="border border-black bg-red-400 hover:bg-red-600" />
        </div>
      </div>
      <div>
        <p>Description: {span.description}</p>
      </div>
    </div>
  )
}

function padZero(number: number) {
  return number.toString().padStart(2, '0')
}

export default WorkSpanCard
