defmodule Trabalhando.ProjectsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Trabalhando.Projects` context.
  """

  @doc """
  Generate a project.
  """
  def project_fixture(attrs \\ %{}) do
    {:ok, project} =
      attrs
      |> Enum.into(%{
        hour_value: "120.5",
        name: "some name"
      })
      |> Trabalhando.Projects.create_project()

    project
  end
end
