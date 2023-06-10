defmodule Trabalhando.TimeTrackingFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Trabalhando.TimeTracking` context.
  """

  @doc """
  Generate a time_span.
  """
  def time_span_fixture(attrs \\ %{}) do
    {:ok, time_span} =
      attrs
      |> Enum.into(%{
        description: "some description",
        start_date: ~U[2023-06-09 16:44:00Z],
        end_date: ~U[2023-06-09 16:44:00Z]
      })
      |> Trabalhando.TimeTracking.create_time_span()

    time_span
  end
end
