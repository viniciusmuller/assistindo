defmodule Trabalhando.Repo do
  use Ecto.Repo,
    otp_app: :trabalhando,
    adapter: Ecto.Adapters.Postgres
end
