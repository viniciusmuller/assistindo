defmodule Trabalhando.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset

  schema "tasks" do
    field :description, :string
    field :name, :string
    belongs_to :project, Trabalhando.Projects.Project
    has_many :work_spans, Trabalhando.TimeTracking.WorkSpan

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:name, :description])
    |> validate_required([:name, :description])
  end
end
