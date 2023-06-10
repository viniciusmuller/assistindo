defmodule Trabalhando.Projects.Project do
  use Ecto.Schema
  import Ecto.Changeset

  schema "projects" do
    field :name, :string
    field :hour_value, :decimal
    field :currency, :string

    timestamps()
  end

  @doc false
  def changeset(project, attrs) do
    project
    |> cast(attrs, [:name, :hour_value, :currency])
    |> validate_required([:name, :hour_value, :currency])
    |> unique_constraint(:name)
  end
end
