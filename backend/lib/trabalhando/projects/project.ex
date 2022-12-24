defmodule Trabalhando.Projects.Project do
  use Ecto.Schema
  import Ecto.Changeset

  schema "projects" do
    field :hour_value, :decimal
    field :name, :string
    field :currency_prefix, :string, default: "$"
    field :total_hours, :float, virtual: true
    field :pending_tasks, :integer, virtual: true
    field :in_progress_tasks, :integer, virtual: true
    has_many :tasks, Trabalhando.Tasks.Task

    timestamps()
  end

  @doc false
  def changeset(project, attrs) do
    project
    |> cast(attrs, [:name, :hour_value, :currency_prefix])
    |> validate_required([:name, :hour_value])
  end
end
