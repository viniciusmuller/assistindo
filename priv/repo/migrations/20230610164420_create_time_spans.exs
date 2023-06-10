defmodule Trabalhando.Repo.Migrations.CreateTimeSpans do
  use Ecto.Migration

  def change do
    create table(:time_spans) do
      add :description, :string
      add :start_date, :utc_datetime
      add :end_date, :utc_datetime
      add :task_id, references(:tasks, on_delete: :nothing)

      timestamps()
    end
  end
end
