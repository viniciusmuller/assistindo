defmodule Trabalhando.Projects.Task do
  use Ecto.Schema
  import Ecto.Changeset

  schema "tasks" do
    field :status, Ecto.Enum, values: [:todo, :doing, :done], default: :todo
    field :description, :string
    field :identifier, :string
    field :project_id, :id

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:identifier, :description, :status])
    |> validate_required([:identifier, :description, :status])
    |> unique_constraint(:identifier)
  end
end
