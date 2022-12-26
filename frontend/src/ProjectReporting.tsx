import { useEffect } from "react";
import { BiSpreadsheet } from "react-icons/bi";
import { TbFileSpreadsheet } from "react-icons/tb";
import Button from "./ui/Button";
import Input from "./ui/Input";

export default function ProjectReporting() {
  useEffect(() => {
    const date = new Date();
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    (document.getElementById("report-start-date") as any).valueAsDate = firstDayOfMonth;
    (document.getElementById("report-end-date") as any).valueAsDate = date
  })

  return (
    <div>
      <h2 className="text-2xl my-2">Time interval</h2>
      <form className="space-y-2">
        <div className="space-x-2">
          <label>
            Start date
          </label>
          <Input id="report-start-date" type="date" />
        </div>
        <div className="space-x-2">
          <label>
            End date
          </label>
          <Input id="report-end-date" type="date" />
        </div>
      </form>
      <h2 className="text-2xl my-2">Generate report</h2>
      <ul className="space-y-2">
        <li>
          <Button classes="border hover:bg-gray-200 flex items-center space-x-1">
            <TbFileSpreadsheet size={30} />
            <span>Generate Excel Report</span>
          </Button>
        </li>
        <li>
          <Button classes="border hover:bg-gray-200 flex items-center space-x-1">
            <BiSpreadsheet size={30} />
            <span>Generate CSV Report</span>
          </Button>
        </li>
      </ul>
    </div>
  )
}
