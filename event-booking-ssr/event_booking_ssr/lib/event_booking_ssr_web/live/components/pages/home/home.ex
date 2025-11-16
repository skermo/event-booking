defmodule EventBookingSSRWeb.Home do
  use EventBookingSSRWeb, :live_view

  import EventBookingSSRWeb.Carousel
  import EventBookingSSRWeb.GridItem
  import EventBookingSSRWeb.Button

  alias EventBookingSSR.EventService

  require Logger

  @initial_page_no 0
  @page_size 5

  def mount(_params, _session, socket) do
    socket =
      socket
      |> assign(recommended_events: [])
      |> assign(featured_events: [])
      |> assign(page_no: @initial_page_no)
      |> assign(all_events_loaded: false)
      |> assign(api_error: nil)

    socket =
      case EventService.get_featured_events() do
        {:ok, data} ->
          assign(socket, recommended_events: data)

        {:error, reason} ->
          Logger.error("Error fetching featured events: #{inspect(reason)}")
          assign(socket, api_error: "Could not load featured events.")
      end

    socket =
      case EventService.get_future_events(@initial_page_no, @page_size) do
        {:ok, %{content: content, last: last}} ->
          socket
          |> assign(:featured_events, content)
          |> assign(:all_events_loaded, last)

        {:error, reason} ->
          Logger.error("Error fetching future events page 0: #{inspect(reason)}")
          assign(socket, api_error: "Could not load future events.")
      end

    {:ok, socket}
  end

  def handle_event("load_more", _params, socket) do
    next_page_no = socket.assigns.page_no + 1

    case EventService.get_future_events(next_page_no, @page_size) do
      {:ok, %{content: new_events, last: last}} ->
        updated_featured_events = socket.assigns.featured_events ++ new_events

        socket =
          socket
          |> assign(:page_no, next_page_no)
          |> assign(:all_events_loaded, last)
          |> assign(:featured_events, updated_featured_events)
          |> assign(:api_error, nil)

        {:noreply, socket}

      {:error, reason} ->
        Logger.error("Error fetching future events page #{next_page_no}: #{inspect(reason)}")
        {:noreply, assign(socket, api_error: "Failed to load more events. Please try again.")}
    end
  end
end
