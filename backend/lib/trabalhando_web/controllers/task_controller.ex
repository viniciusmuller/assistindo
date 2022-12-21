defmodule TrabalhandoWeb.TaskController do
  use TrabalhandoWeb, :controller

  alias Trabalhando.Projects
  alias Trabalhando.Tasks
  alias Trabalhando.Tasks.Task

  action_fallback TrabalhandoWeb.FallbackController

  def index(conn, %{"project_id" => project_id}) do
    tasks = Projects.get_project_tasks(project_id)
    render(conn, "index.json", tasks: tasks)
  end

  def create(conn, %{"project_id" => project_id, "task" => task_params}) do
    project = Projects.get_project!(project_id)

    with {:ok, %Task{} = task} <- Tasks.create_task(project, task_params) do
      conn
      |> put_status(:created)
      |> render("show.json", task: task)
    end
  end

  def show(conn, %{"id" => id}) do
    task = Tasks.get_task!(id)
    render(conn, "show.json", task: task)
  end

  def update(conn, %{"id" => id, "task" => task_params}) do
    task = Tasks.get_task!(id)

    with {:ok, %Task{} = task} <- Tasks.update_task(task, task_params) do
      render(conn, "show.json", task: task)
    end
  end

  def delete(conn, %{"id" => id}) do
    task = Tasks.get_task!(id)

    with {:ok, %Task{}} <- Tasks.delete_task(task) do
      send_resp(conn, :no_content, "")
    end
  end
end
