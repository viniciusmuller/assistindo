defmodule TrabalhandoWeb.TaskView do
  use TrabalhandoWeb, :view

  alias TrabalhandoWeb.TaskView

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
      total_hours: task.total_hours
    }
  end
end
