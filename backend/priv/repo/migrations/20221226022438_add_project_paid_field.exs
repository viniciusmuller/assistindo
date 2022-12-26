defmodule Trabalhando.Repo.Migrations.AddProjectPaidField do
  use Ecto.Migration

  def change do
    alter table(:projects) do 
      add :paid, :boolean
    end
  end
end
