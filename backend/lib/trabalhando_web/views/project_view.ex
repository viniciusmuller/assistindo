defmodule TrabalhandoWeb.ProjectView do
  use TrabalhandoWeb, :view

  alias TrabalhandoWeb.ProjectView
  alias TrabalhandoWeb.TaskView

  def render("index.json", %{projects: projects}) do
    %{data: render_many(projects, ProjectView, "project.json")}
  end

  def render("show.json", %{project: project}) do
    %{data: render_one(project, ProjectView, "project.json")}
  end

  def render("project.json", %{project: project}) do
    %{
      id: project.id,
      name: project.name,
      hour_value: project.hour_value,
      tasks: render_association(project.tasks)
    }
  end

  defp render_association(field) do
    case field do
      %Ecto.Association.NotLoaded{} -> nil
      tasks -> render_many(tasks, TaskView, "task.json")
    end
  end
end
