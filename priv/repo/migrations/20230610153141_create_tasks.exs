defmodule Trabalhando.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :identifier, :string
      add :description, :string
      add :status, :string
      add :project_id, references(:projects, on_delete: :nothing)

      timestamps()
    end

    create unique_index(:tasks, [:identifier])
    create index(:tasks, [:project_id])
  end
end
