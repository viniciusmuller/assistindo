defmodule TrabalhandoWeb.WorkSpanView do
  use TrabalhandoWeb, :view
  alias TrabalhandoWeb.WorkSpanView

  def render("index.json", %{work_spans: work_spans}) do
    %{data: render_many(work_spans, WorkSpanView, "work_span.json")}
  end

  def render("show.json", %{work_span: span}) do
    %{data: render_one(span, WorkSpanView, "work_span.json")}
  end

  def render("work_span.json", %{work_span: span}) do
    %{
      id: span.id,
      project_id: span.project_id,
      start_date: span.start_date,
      end_date: span.end_date,
      description: span.description
    }
  end
end
