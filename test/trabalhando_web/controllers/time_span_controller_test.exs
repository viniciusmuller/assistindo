defmodule TrabalhandoWeb.TimeSpanControllerTest do
  use TrabalhandoWeb.ConnCase

  import Trabalhando.TimeTrackingFixtures

  @create_attrs %{description: "some description", start_date: ~U[2023-06-09 16:44:00Z], end_date: ~U[2023-06-09 16:44:00Z]}
  @update_attrs %{description: "some updated description", start_date: ~U[2023-06-10 16:44:00Z], end_date: ~U[2023-06-10 16:44:00Z]}
  @invalid_attrs %{description: nil, start_date: nil, end_date: nil}

  describe "index" do
    test "lists all time_spans", %{conn: conn} do
      conn = get(conn, ~p"/time_spans")
      assert html_response(conn, 200) =~ "Listing Time spans"
    end
  end

  describe "new time_span" do
    test "renders form", %{conn: conn} do
      conn = get(conn, ~p"/time_spans/new")
      assert html_response(conn, 200) =~ "New Time span"
    end
  end

  describe "create time_span" do
    test "redirects to show when data is valid", %{conn: conn} do
      conn = post(conn, ~p"/time_spans", time_span: @create_attrs)

      assert %{id: id} = redirected_params(conn)
      assert redirected_to(conn) == ~p"/time_spans/#{id}"

      conn = get(conn, ~p"/time_spans/#{id}")
      assert html_response(conn, 200) =~ "Time span #{id}"
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, ~p"/time_spans", time_span: @invalid_attrs)
      assert html_response(conn, 200) =~ "New Time span"
    end
  end

  describe "edit time_span" do
    setup [:create_time_span]

    test "renders form for editing chosen time_span", %{conn: conn, time_span: time_span} do
      conn = get(conn, ~p"/time_spans/#{time_span}/edit")
      assert html_response(conn, 200) =~ "Edit Time span"
    end
  end

  describe "update time_span" do
    setup [:create_time_span]

    test "redirects when data is valid", %{conn: conn, time_span: time_span} do
      conn = put(conn, ~p"/time_spans/#{time_span}", time_span: @update_attrs)
      assert redirected_to(conn) == ~p"/time_spans/#{time_span}"

      conn = get(conn, ~p"/time_spans/#{time_span}")
      assert html_response(conn, 200) =~ "some updated description"
    end

    test "renders errors when data is invalid", %{conn: conn, time_span: time_span} do
      conn = put(conn, ~p"/time_spans/#{time_span}", time_span: @invalid_attrs)
      assert html_response(conn, 200) =~ "Edit Time span"
    end
  end

  describe "delete time_span" do
    setup [:create_time_span]

    test "deletes chosen time_span", %{conn: conn, time_span: time_span} do
      conn = delete(conn, ~p"/time_spans/#{time_span}")
      assert redirected_to(conn) == ~p"/time_spans"

      assert_error_sent 404, fn ->
        get(conn, ~p"/time_spans/#{time_span}")
      end
    end
  end

  defp create_time_span(_) do
    time_span = time_span_fixture()
    %{time_span: time_span}
  end
end
