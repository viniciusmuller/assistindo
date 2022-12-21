defmodule Trabalhando.Repo.Migrations.WorkSpanBelongsToProject do
  use Ecto.Migration

  def change do
    alter table(:work_spans) do 
      add :project_id, references(:projects)
    end
  end
end
