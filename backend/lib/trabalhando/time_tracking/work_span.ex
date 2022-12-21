defmodule Trabalhando.TimeTracking.WorkSpan do
  use Ecto.Schema
  import Ecto.Changeset

  schema "work_spans" do
    field :description, :string
    field :end_date, :utc_datetime
    field :start_date, :utc_datetime
    belongs_to :task, Trabalhando.Tasks.Task

    timestamps()
  end

  @doc false
  def changeset(work_span, attrs) do
    work_span
    |> cast(attrs, [:start_date, :end_date, :description])
    |> validate_required([:start_date, :end_date, :description])
  end
end
