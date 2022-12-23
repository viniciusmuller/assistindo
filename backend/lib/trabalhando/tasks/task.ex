defmodule Trabalhando.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset

  schema "tasks" do
    field :description, :string
    field :name, :string
    field :status, Ecto.Enum, values: [:todo, :doing, :done], default: :todo
    field :total_hours, :float, virtual: true
    belongs_to :project, Trabalhando.Projects.Project
    has_many :work_spans, Trabalhando.TimeTracking.WorkSpan

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:name, :description, :status])
    |> validate_required([:name, :description, :status])
  end
end
