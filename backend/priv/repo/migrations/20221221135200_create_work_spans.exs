defmodule Trabalhando.Repo.Migrations.CreateWorkSpans do
  use Ecto.Migration

  def change do
    create table(:work_spans) do
      add :start_date, :utc_datetime
      add :end_date, :utc_datetime
      add :description, :string

      timestamps()
    end
  end
end
