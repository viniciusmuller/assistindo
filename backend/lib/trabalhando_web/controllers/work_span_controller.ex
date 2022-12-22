defmodule TrabalhandoWeb.WorkSpanController do
  use TrabalhandoWeb, :controller

  alias Trabalhando.Tasks
  alias Trabalhando.TimeTracking.WorkSpan
  alias Trabalhando.TimeTracking

  action_fallback TrabalhandoWeb.FallbackController

  def index(conn, %{"task_id" => task_id}) do
    work_spans = Tasks.list_task_work_spans(task_id)
    render(conn, "index.json", work_spans: work_spans)
  end

  def create(conn, %{"task_id" => task_id, "work_span" => work_span_params}) do
    task = Tasks.get_task!(task_id)

    with {:ok, %WorkSpan{} = span} <- TimeTracking.create_work_span(task, work_span_params) do
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
