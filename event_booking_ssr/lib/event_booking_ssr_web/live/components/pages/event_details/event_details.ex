defmodule EventBookingSSRWeb.EventDetails do
  use EventBookingSSRWeb, :live_view

  alias EventBookingSSR.EventService

  import EventBookingSSRWeb.{
    EventPhotos,
    EventMap,
    GridItem,
    Button,
    BookEventModal
  }

  def mount(%{"id" => event_id}, _session, socket) do
    case EventService.get_event_by_id(event_id) do
      {:ok, event} ->
        {:ok,
         socket
         |> assign(:event, event)
         |> assign(:event_booked, false)
         |> assign(:book_event_modal_opened, false)
         |> load_similar_events(event_id)}

      {:error, reason} ->
        {:ok, assign(socket, error: reason)}
    end
  end

  defp load_similar_events(socket, event_id) do
    case EventService.get_similar_events(event_id) do
      {:ok, events} -> assign(socket, :similar_events, events)
      _ -> assign(socket, :similar_events, [])
    end
  end

  def handle_event("open_booking_modal", _, socket),
    do: {:noreply, assign(socket, :book_event_modal_opened, true)}

  def handle_event("close_booking_modal", _, socket),
    do: {:noreply, assign(socket, :book_event_modal_opened, false)}

  def handle_info(:booking_success, socket) do
    {:noreply,
     socket
     |> assign(:event_booked, true)
     |> assign(:book_event_modal_opened, false)
     |> refresh_event(socket.assigns.event.id)}
  end

  defp refresh_event(socket, event_id) do
    case EventService.get_event_by_id(event_id) do
      {:ok, event} -> assign(socket, :event, event)
      _ -> socket
    end
  end
end
