defmodule Trabalhando.Repo.Migrations.TaskBelongsToProjectWorkspanBelongsToTask do
  use Ecto.Migration

  def change do
    alter table(:work_spans) do 
      remove :project_id
      add :task_id, references(:tasks)
    end

    alter table(:tasks) do 
      add :project_id, references(:projects)
    end
  end
end
