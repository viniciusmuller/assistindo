defmodule Trabalhando.ProjectsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Trabalhando.Projects` context.
  """

  @doc """
  Generate a unique project name.
  """
  def unique_project_name, do: "some name#{System.unique_integer([:positive])}"

  @doc """
  Generate a project.
  """
  def project_fixture(attrs \\ %{}) do
    {:ok, project} =
      attrs
      |> Enum.into(%{
        name: unique_project_name(),
        hour_value: "120.5",
        currency: "some currency"
      })
      |> Trabalhando.Projects.create_project()

    project
  end

  @doc """
  Generate a unique task identifier.
  """
  def unique_task_identifier, do: "some identifier#{System.unique_integer([:positive])}"

  @doc """
  Generate a task.
  """
  def task_fixture(attrs \\ %{}) do
    {:ok, task} =
      attrs
      |> Enum.into(%{
        status: :todo,
        description: "some description",
        identifier: unique_task_identifier()
      })
      |> Trabalhando.Projects.create_task()

    task
  end
end
