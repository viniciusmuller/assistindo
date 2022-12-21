defmodule Trabalhando.TimeTrackingTest do
  use Trabalhando.DataCase

  alias Trabalhando.TimeTracking

  describe "work_spans" do
    alias Trabalhando.TimeTracking.WorkSpan

    import Trabalhando.TimeTrackingFixtures

    @invalid_attrs %{description: nil, end_date: nil, start_date: nil}

    test "get_work_span!/1 returns the work_span with given id" do
      work_span = work_span_fixture()
      assert TimeTracking.get_work_span!(work_span.id) == work_span
    end

    test "create_work_span/1 with valid data creates a work_span" do
      valid_attrs = %{description: "some description", end_date: ~U[2022-12-20 13:52:00Z], start_date: ~U[2022-12-20 13:52:00Z]}

      assert {:ok, %WorkSpan{} = work_span} = TimeTracking.create_work_span(valid_attrs)
      assert work_span.description == "some description"
      assert work_span.end_date == ~U[2022-12-20 13:52:00Z]
      assert work_span.start_date == ~U[2022-12-20 13:52:00Z]
    end

    test "create_work_span/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = TimeTracking.create_work_span(@invalid_attrs)
    end

    test "update_work_span/2 with valid data updates the work_span" do
      work_span = work_span_fixture()
      update_attrs = %{description: "some updated description", end_date: ~U[2022-12-21 13:52:00Z], start_date: ~U[2022-12-21 13:52:00Z]}

      assert {:ok, %WorkSpan{} = work_span} = TimeTracking.update_work_span(work_span, update_attrs)
      assert work_span.description == "some updated description"
      assert work_span.end_date == ~U[2022-12-21 13:52:00Z]
      assert work_span.start_date == ~U[2022-12-21 13:52:00Z]
    end

    test "update_work_span/2 with invalid data returns error changeset" do
      work_span = work_span_fixture()
      assert {:error, %Ecto.Changeset{}} = TimeTracking.update_work_span(work_span, @invalid_attrs)
      assert work_span == TimeTracking.get_work_span!(work_span.id)
    end

    test "delete_work_span/1 deletes the work_span" do
      work_span = work_span_fixture()
      assert {:ok, %WorkSpan{}} = TimeTracking.delete_work_span(work_span)
      assert_raise Ecto.NoResultsError, fn -> TimeTracking.get_work_span!(work_span.id) end
    end

    test "change_work_span/1 returns a work_span changeset" do
      work_span = work_span_fixture()
      assert %Ecto.Changeset{} = TimeTracking.change_work_span(work_span)
    end
  end
end
