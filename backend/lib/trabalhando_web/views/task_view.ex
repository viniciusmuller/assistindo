defmodule TrabalhandoWeb.TaskView do
  use TrabalhandoWeb, :view

  alias TrabalhandoWeb.TaskView
  alias TrabalhandoWeb.WorkSpanView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{
      id: task.id,
      project_id: task.project_id,
      status: task.status,
      name: task.name,
      description: task.description,
      work_spans: render_association(task.work_spans)
    }
  end

  defp render_association(field) do
    case field do
      %Ecto.Association.NotLoaded{} -> nil
      work_spans -> render_many(work_spans, WorkSpanView, "work_span.json")
    end
  end
end
