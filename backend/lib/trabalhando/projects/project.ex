defmodule Trabalhando.Projects.Project do
  use Ecto.Schema
  import Ecto.Changeset

  schema "projects" do
    field :name, :string
    field :paid, :boolean
    field :hour_value, :decimal
    field :currency_prefix, :string
    has_many :tasks, Trabalhando.Tasks.Task

    field :total_hours, :float, virtual: true
    field :pending_tasks, :integer, virtual: true
    field :in_progress_tasks, :integer, virtual: true

    timestamps()
  end

  @doc false
  def changeset(project, attrs) do
    project
    |> cast(attrs, [:name, :hour_value, :currency_prefix, :paid])
    |> validate_required([:name, :paid])
  end
end
