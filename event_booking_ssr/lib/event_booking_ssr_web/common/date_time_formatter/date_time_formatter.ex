defmodule EventBookingSSRWeb.DateTimeFormatter do
  @moduledoc """
  Utility functions for formatting dates, times, and durations.
  """

  @doc """
  Formats a date string (YYYY-MM-DD) and a time string (HH:MM:SS)
  into the format "DD.MM.YYYY. at HH:MM".

  ## Examples
      iex> EventBookingSSRWeb.DateTimeFormatter.format_date_time("2025-11-06", "19:51:44")
      "06.11.2025. at 19:51"
  """
  def format_date_time(date, time) do
    [year, month, day] = String.split(date, "-")
    formatted_time = String.slice(time, 0, 5)

    "#{day}.#{month}.#{year}. at #{formatted_time}"
  end

  @doc """
  Formats a duration in minutes into a human-readable string
  (e.g., "1 day, 2 hours, 3 minutes").

  ## Examples
      iex> EventBookingSSRWeb.DateTimeFormatter.format_duration(1500)
      "1 day, 1 hour, 0 minutes"

      iex> EventBookingSSRWeb.DateTimeFormatter.format_duration(65)
      "1 hour, 5 minutes"
  """
  def format_duration(duration_in_minutes)
      when is_integer(duration_in_minutes) and duration_in_minutes >= 0 do
    minutes_in_day = 24 * 60
    minutes_in_hour = 60

    days = div(duration_in_minutes, minutes_in_day)
    remaining_minutes = rem(duration_in_minutes, minutes_in_day)
    hours = div(remaining_minutes, minutes_in_hour)
    minutes = rem(remaining_minutes, minutes_in_hour)

    parts =
      []
      |> add_part(days, "day")
      |> add_part(hours, "hour")
      |> add_part(minutes, "minute")
      |> Enum.reject(&is_nil/1)

    case parts do
      [] -> "0 minutes"
      _ -> Enum.join(parts, ", ")
    end
  end

  defp add_part(parts, 0, _unit), do: parts

  defp add_part(parts, value, unit) do
    label = if value > 1, do: "#{unit}s", else: unit
    ["#{value} #{label}" | parts]
  end
end
