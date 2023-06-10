defmodule TrabalhandoWeb.Plugs.FetchProject do
  import Plug.Conn

  alias Trabalhando.Projects

  def init(default), do: default

  def call(%Plug.Conn{params: %{"project_id" => id}} = conn, _default) do
    project = Projects.get_project!(id)
    assign(conn, :project, project)
  end
end
