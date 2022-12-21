defmodule TrabalhandoWeb.WorkSpanController do
  use TrabalhandoWeb, :controller

  alias Trabalhando.TimeTracking.WorkSpan
  alias Trabalhando.TimeTracking
  alias Trabalhando.Projects

  action_fallback TrabalhandoWeb.FallbackController

  def index(conn, %{"project_id" => project_id}) do
    spans = Projects.get_project_work_spans(project_id)
    render(conn, "index.json", work_spans: spans)
  end

  def create(conn, %{"project_id" => project_id, "work_span" => work_span_params}) do
    project = Projects.get_project!(project_id)

    with {:ok, %WorkSpan{} = span} <- TimeTracking.create_work_span(project, work_span_params) do
      conn
      |> put_status(:created)
      |> render("show.json", work_span: span)
    end
  end

  def update(conn, %{"id" => id, "work_span" => work_span_params}) do
    span = TimeTracking.get_work_span!(id)

    with {:ok, %WorkSpan{} = work_span} <- TimeTracking.update_work_span(span, work_span_params) do
      render(conn, "show.json", work_span: work_span)
    end
  end

  def delete(conn, %{"id" => id}) do
    span = TimeTracking.get_work_span!(id)

    with {:ok, %WorkSpan{}} <- TimeTracking.delete_work_span(span) do
      send_resp(conn, :no_content, "")
    end
  end
end
