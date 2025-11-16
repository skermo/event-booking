defmodule EventBookingSSR.CityService do
  @moduledoc "Service module for fetching cities from external API."

  @api_url Application.compile_env(:event_booking_ssr, :api_url)

  def get_all_cities() do
    "#{@api_url}/cities" |> get_json()
  end

  defp get_json(url) do
    case HTTPoison.get(url, [], recv_timeout: 10_000) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        Jason.decode(body, keys: :atoms)

      {:ok, %HTTPoison.Response{status_code: code}} ->
        {:error, "Request failed with status #{code}"}

      {:error, %HTTPoison.Error{reason: reason}} ->
        {:error, reason}
    end
  end
end
