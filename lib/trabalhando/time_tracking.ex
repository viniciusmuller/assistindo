defmodule Trabalhando.TimeTracking do
  @moduledoc """
  The TimeTracking context.
  """

  import Ecto.Query, warn: false
  alias Trabalhando.Repo

  alias Trabalhando.TimeTracking.TimeSpan

  @doc """
  Returns the list of time_spans.

  ## Examples

      iex> list_time_spans()
      [%TimeSpan{}, ...]

  """
  def list_time_spans do
    Repo.all(TimeSpan)
  end

  @doc """
  Gets a single time_span.

  Raises `Ecto.NoResultsError` if the Time span does not exist.

  ## Examples

      iex> get_time_span!(123)
      %TimeSpan{}

      iex> get_time_span!(456)
      ** (Ecto.NoResultsError)

  """
  def get_time_span!(id), do: Repo.get!(TimeSpan, id)

  @doc """
  Creates a time_span.

  ## Examples

      iex> create_time_span(%{field: value})
      {:ok, %TimeSpan{}}

      iex> create_time_span(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_time_span(attrs \\ %{}) do
    %TimeSpan{}
    |> TimeSpan.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a time_span.

  ## Examples

      iex> update_time_span(time_span, %{field: new_value})
      {:ok, %TimeSpan{}}

      iex> update_time_span(time_span, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_time_span(%TimeSpan{} = time_span, attrs) do
    time_span
    |> TimeSpan.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a time_span.

  ## Examples

      iex> delete_time_span(time_span)
      {:ok, %TimeSpan{}}

      iex> delete_time_span(time_span)
      {:error, %Ecto.Changeset{}}

  """
  def delete_time_span(%TimeSpan{} = time_span) do
    Repo.delete(time_span)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking time_span changes.

  ## Examples

      iex> change_time_span(time_span)
      %Ecto.Changeset{data: %TimeSpan{}}

  """
  def change_time_span(%TimeSpan{} = time_span, attrs \\ %{}) do
    TimeSpan.changeset(time_span, attrs)
  end
end
