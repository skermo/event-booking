defmodule EventBookingSSR.EventService do
  @moduledoc "Service module for fetching events from external API."

  @api_url Application.compile_env(:event_booking_ssr, :api_url)

  def get_featured_events do
    "#{@api_url}/events/featured"
    |> get_json()
  end

  def get_future_events(page_no, page_size) do
    "#{@api_url}/events/future?pageNo=#{page_no}&pageSize=#{page_size}"
    |> get_json()
  end

  def get_event_by_id(event_id) do
    "#{@api_url}/events/#{event_id}"
    |> get_json()
  end

  def get_similar_events(event_id) do
    "#{@api_url}/events/#{event_id}/similar"
    |> get_json()
  end

  def search_events(title, category_id, city_id, start_date, page_no, sort_by, sort_dir) do
    ("#{@api_url}/events/search?" <>
       URI.encode_query(%{
         pageNo: page_no,
         pageSize: 5,
         sortBy: sort_by,
         sortDir: sort_dir,
         title: title,
         categoryId: category_id,
         cityId: city_id,
         startDate: start_date
       }))
    |> get_json()
  end

  def book_event(event_id, number_of_tickets) do
    url = "#{@api_url}/events/#{event_id}/book?numberOfTickets=#{number_of_tickets}"

    case HTTPoison.post(url, "", [], recv_timeout: 10_000) do
      {:ok, %HTTPoison.Response{status_code: code}} when code in [200, 204] ->
        {:ok, :success}

      {:ok, %HTTPoison.Response{status_code: code, body: body}} ->
        {:error, "Booking failed with status #{code}", body}

      {:error, %HTTPoison.Error{reason: reason}} ->
        {:error, reason}
    end
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
