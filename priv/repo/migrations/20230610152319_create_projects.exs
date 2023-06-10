defmodule Trabalhando.Repo.Migrations.CreateProjects do
  use Ecto.Migration

  def change do
    create table(:projects) do
      add :name, :string
      add :hour_value, :decimal
      add :currency, :string

      timestamps()
    end

    create unique_index(:projects, [:name])
  end
end
