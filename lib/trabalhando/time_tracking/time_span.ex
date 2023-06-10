defmodule Trabalhando.TimeTracking.TimeSpan do
  use Ecto.Schema
  import Ecto.Changeset

  schema "time_spans" do
    field :description, :string
    field :start_date, :utc_datetime
    field :end_date, :utc_datetime
    belongs_to :task, Trabalhando.Projects.Task

    timestamps()
  end

  @doc false
  def changeset(time_span, attrs) do
    time_span
    |> cast(attrs, [:description, :start_date, :end_date])
    |> validate_required([:description, :start_date, :end_date])
  end
end
