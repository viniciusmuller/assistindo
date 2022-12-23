defmodule Trabalhando.Projects do
  @moduledoc """
  The Projects context.
  """

  import Ecto.Query, warn: false
  alias Trabalhando.Repo

  alias Trabalhando.Projects.Project
  alias Trabalhando.Tasks.Task

  @doc """
  Returns the list of projects.

  ## Examples

      iex> list_projects()
      [%Project{}, ...]

  """
  def list_projects do
    # query =
    #   from(p in Project,
    #     select: %{
    #       p
    #       | hours_last_two_weeks: 20
    #         # from(t2 in Task,
    #         #   where: t2.id == ^t1.id,
    #         #   join: ws in assoc(t2, :work_spans),
    #         #   group_by: [ws.task_id, t2.id],
    #         #   select:
    #         #     sum(fragment("EXTRACT(EPOCH from ? - ?) / 3600", ws.end_date, ws.start_date))
    #         # )
    #     }
    #   )

    Repo.all(Project)
  end

  def get_project_tasks(project_id) do
    query =
      from(t in Task,
        left_join: ws in assoc(t, :work_spans),
        group_by: [ws.task_id, t.id],
        where: t.project_id == ^project_id,
        select: %{
          t
          | total_hours:
              sum(fragment("EXTRACT(EPOCH from ? - ?) / 3600", ws.end_date, ws.start_date))
        }
      )

    # TODO: figure how to do it inside the query
    Repo.all(query)
    |> Enum.map(fn task ->
      case task.total_hours do
        nil -> Map.put(task, :total_hours, 0)
        _ -> task
      end
    end)
  end

  @doc """
  Gets a single project.

  Raises `Ecto.NoResultsError` if the Project does not exist.

  ## Examples

      iex> get_project!(123)
      %Project{}

      iex> get_project!(456)
      ** (Ecto.NoResultsError)

  """
  def get_project!(id), do: Repo.get!(Project, id)

  @doc """
  Creates a project.

  ## Examples

      iex> create_project(%{field: value})
      {:ok, %Project{}}

      iex> create_project(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_project(attrs \\ %{}) do
    %Project{}
    |> Project.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a project.

  ## Examples

      iex> update_project(project, %{field: new_value})
      {:ok, %Project{}}

      iex> update_project(project, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_project(%Project{} = project, attrs) do
    project
    |> Project.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a project.

  ## Examples

      iex> delete_project(project)
      {:ok, %Project{}}

      iex> delete_project(project)
      {:error, %Ecto.Changeset{}}

  """
  def delete_project(%Project{} = project) do
    Repo.delete(project)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking project changes.

  ## Examples

      iex> change_project(project)
      %Ecto.Changeset{data: %Project{}}

  """
  def change_project(%Project{} = project, attrs \\ %{}) do
    Project.changeset(project, attrs)
  end
end
