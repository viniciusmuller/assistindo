defmodule Trabalhando.Projects.Project do
  use Ecto.Schema
  import Ecto.Changeset

  schema "projects" do
    field :hour_value, :decimal
    field :name, :string
    has_many :work_spans, Trabalhando.TimeTracking.WorkSpan

    timestamps()
  end

  @doc false
  def changeset(project, attrs) do
    project
    |> cast(attrs, [:name, :hour_value])
    |> validate_required([:name, :hour_value])
  end
end
