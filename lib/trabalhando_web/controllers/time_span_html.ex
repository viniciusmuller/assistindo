defmodule TrabalhandoWeb.TimeSpanHTML do
  use TrabalhandoWeb, :html

  embed_templates "time_span_html/*"

  @doc """
  Renders a time_span form.
  """
  attr :changeset, Ecto.Changeset, required: true
  attr :action, :string, required: true

  def time_span_form(assigns)
end
