defmodule Trabalhando.TimeTrackingFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Trabalhando.TimeTracking` context.
  """

  @doc """
  Generate a work_span.
  """
  def work_span_fixture(attrs \\ %{}) do
    {:ok, work_span} =
      attrs
      |> Enum.into(%{
        description: "some description",
        end_date: ~U[2022-12-20 13:52:00Z],
        start_date: ~U[2022-12-20 13:52:00Z]
      })
      |> Trabalhando.TimeTracking.create_work_span()

    work_span
  end
end
