defmodule Trabalhando.TimeTrackingTest do
  use Trabalhando.DataCase

  alias Trabalhando.TimeTracking

  describe "time_spans" do
    alias Trabalhando.TimeTracking.TimeSpan

    import Trabalhando.TimeTrackingFixtures

    @invalid_attrs %{description: nil, start_date: nil, end_date: nil}

    test "list_time_spans/0 returns all time_spans" do
      time_span = time_span_fixture()
      assert TimeTracking.list_time_spans() == [time_span]
    end

    test "get_time_span!/1 returns the time_span with given id" do
      time_span = time_span_fixture()
      assert TimeTracking.get_time_span!(time_span.id) == time_span
    end

    test "create_time_span/1 with valid data creates a time_span" do
      valid_attrs = %{description: "some description", start_date: ~U[2023-06-09 16:44:00Z], end_date: ~U[2023-06-09 16:44:00Z]}

      assert {:ok, %TimeSpan{} = time_span} = TimeTracking.create_time_span(valid_attrs)
      assert time_span.description == "some description"
      assert time_span.start_date == ~U[2023-06-09 16:44:00Z]
      assert time_span.end_date == ~U[2023-06-09 16:44:00Z]
    end

    test "create_time_span/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = TimeTracking.create_time_span(@invalid_attrs)
    end

    test "update_time_span/2 with valid data updates the time_span" do
      time_span = time_span_fixture()
      update_attrs = %{description: "some updated description", start_date: ~U[2023-06-10 16:44:00Z], end_date: ~U[2023-06-10 16:44:00Z]}

      assert {:ok, %TimeSpan{} = time_span} = TimeTracking.update_time_span(time_span, update_attrs)
      assert time_span.description == "some updated description"
      assert time_span.start_date == ~U[2023-06-10 16:44:00Z]
      assert time_span.end_date == ~U[2023-06-10 16:44:00Z]
    end

    test "update_time_span/2 with invalid data returns error changeset" do
      time_span = time_span_fixture()
      assert {:error, %Ecto.Changeset{}} = TimeTracking.update_time_span(time_span, @invalid_attrs)
      assert time_span == TimeTracking.get_time_span!(time_span.id)
    end

    test "delete_time_span/1 deletes the time_span" do
      time_span = time_span_fixture()
      assert {:ok, %TimeSpan{}} = TimeTracking.delete_time_span(time_span)
      assert_raise Ecto.NoResultsError, fn -> TimeTracking.get_time_span!(time_span.id) end
    end

    test "change_time_span/1 returns a time_span changeset" do
      time_span = time_span_fixture()
      assert %Ecto.Changeset{} = TimeTracking.change_time_span(time_span)
    end
  end
end
