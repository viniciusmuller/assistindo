defmodule TrabalhandoWeb.TimeSpanController do
  use TrabalhandoWeb, :controller

  alias Trabalhando.TimeTracking
  alias Trabalhando.TimeTracking.TimeSpan

  plug TrabalhandoWeb.Plugs.FetchProject
  plug TrabalhandoWeb.Plugs.FetchTask

  def index(conn, _params) do
    time_spans = TimeTracking.list_time_spans()
    render(conn, :index, time_spans: time_spans)
  end

  def new(conn, _params) do
    changeset = TimeTracking.change_time_span(%TimeSpan{})
    render(conn, :new, changeset: changeset)
  end

  def create(conn, %{"time_span" => time_span_params}) do
    case TimeTracking.create_time_span(time_span_params) do
      {:ok, time_span} ->
        conn
        |> put_flash(:info, "Time span created successfully.")
        |> redirect(to: ~p"/projects/#{@project}/tasks/#{@task}/time_spans/#{time_span}")

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, :new, changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    time_span = TimeTracking.get_time_span!(id)
    render(conn, :show, time_span: time_span)
  end

  def edit(conn, %{"id" => id}) do
    time_span = TimeTracking.get_time_span!(id)
    changeset = TimeTracking.change_time_span(time_span)
    render(conn, :edit, time_span: time_span, changeset: changeset)
  end

  def update(conn, %{"id" => id, "time_span" => time_span_params}) do
    time_span = TimeTracking.get_time_span!(id)

    case TimeTracking.update_time_span(time_span, time_span_params) do
      {:ok, time_span} ->
        conn
        |> put_flash(:info, "Time span updated successfully.")
        |> redirect(to: ~p"/projects/#{@project}/tasks/#{@task}/time_spans/#{time_span}")

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, :edit, time_span: time_span, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    time_span = TimeTracking.get_time_span!(id)
    {:ok, _time_span} = TimeTracking.delete_time_span(time_span)

    conn
    |> put_flash(:info, "Time span deleted successfully.")
    |> redirect(to: ~p"/projects/#{@project}/tasks/#{@task}/time_spans")
  end
end
