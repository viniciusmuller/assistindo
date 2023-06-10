defmodule TrabalhandoWeb.Plugs.FetchTask do
  import Plug.Conn

  alias Trabalhando.Projects

  def init(default), do: default

  def call(%Plug.Conn{params: %{"task_id" => id}} = conn, _default) do
    task = Projects.get_task!(id)
    assign(conn, :task, task)
  end
end
