defmodule Trabalhando.Repo.Migrations.AddTaskStatus do
  use Ecto.Migration

  def change do
    alter table(:tasks) do 
      add :status, :string
    end
  end
end
