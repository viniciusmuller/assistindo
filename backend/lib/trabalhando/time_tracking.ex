defmodule Trabalhando.TimeTracking do
  @moduledoc """
  The TimeTracking context.
  """

  import Ecto.Query, warn: false
  alias Trabalhando.Repo

  alias Trabalhando.TimeTracking.WorkSpan

  @doc """
  Gets a single work_span.

  Raises `Ecto.NoResultsError` if the Work span does not exist.

  ## Examples

      iex> get_work_span!(123)
      %WorkSpan{}

      iex> get_work_span!(456)
      ** (Ecto.NoResultsError)

  """
  def get_work_span!(id), do: Repo.get!(WorkSpan, id)

  @doc """
  Creates a work_span.

  ## Examples

      iex> create_work_span(%{field: value})
      {:ok, %WorkSpan{}}

      iex> create_work_span(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_work_span(project, attrs \\ %{}) do
    %WorkSpan{project: project}
    |> WorkSpan.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a work_span.

  ## Examples

      iex> update_work_span(work_span, %{field: new_value})
      {:ok, %WorkSpan{}}

      iex> update_work_span(work_span, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_work_span(%WorkSpan{} = work_span, attrs) do
    work_span
    |> WorkSpan.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a work_span.

  ## Examples

      iex> delete_work_span(work_span)
      {:ok, %WorkSpan{}}

      iex> delete_work_span(work_span)
      {:error, %Ecto.Changeset{}}

  """
  def delete_work_span(%WorkSpan{} = work_span) do
    Repo.delete(work_span)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking work_span changes.

  ## Examples

      iex> change_work_span(work_span)
      %Ecto.Changeset{data: %WorkSpan{}}

  """
  def change_work_span(%WorkSpan{} = work_span, attrs \\ %{}) do
    WorkSpan.changeset(work_span, attrs)
  end
end
