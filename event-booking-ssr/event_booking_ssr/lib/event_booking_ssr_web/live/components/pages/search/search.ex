defmodule EventBookingSSRWeb.Search do
  use EventBookingSSRWeb, :live_view

  alias EventBookingSSR.{EventService, CategoryService, CityService}

  import EventBookingSSRWeb.InputField
  import EventBookingSSRWeb.Select
  import EventBookingSSRWeb.GridItem
  import EventBookingSSRWeb.Button

  def mount(_params, _session, socket) do
    {:ok, cities} = CityService.get_all_cities()
    {:ok, categories} = CategoryService.get_all_categories()

    {:ok,
     socket
     |> assign(:cities, cities)
     |> assign(:categories, categories)
     |> assign(:title, "")
     |> assign(:category_id, "")
     |> assign(:city_id, "")
     |> assign(:start_date, "")
     |> assign(:sort_by, "startDate")
     |> assign(:sort_dir, "asc")
     |> assign(:page_no, 0)
     |> assign(:all_events_loaded, false)
     |> assign(:sort_by_options, [
       %{value: "startDate", label: "Start date"},
       %{value: "title", label: "Title"}
     ])
     |> assign(:sort_dir_options, [
       %{value: "asc", label: "Ascending"},
       %{value: "desc", label: "Descending"}
     ])}
  end

  def handle_params(params, _url, socket) do
    socket =
      socket
      |> assign(:title, Map.get(params, "title", ""))
      |> assign(:category_id, Map.get(params, "categoryId", ""))
      |> assign(:city_id, Map.get(params, "cityId", ""))
      |> assign(:start_date, Map.get(params, "startDate", ""))
      |> assign(:sort_by, Map.get(params, "sortBy", "startDate"))
      |> assign(:sort_dir, Map.get(params, "sortDir", "asc"))
      |> assign(:page_no, 0)
      |> load_events()

    {:noreply, socket}
  end

  def handle_event("update_param", %{"_target" => [field]} = params, socket) do
    value = Map.get(params, field, "")

    socket =
      socket
      |> assign(String.to_existing_atom(field), value)
      |> assign(:page_no, 0)
      |> load_events()

    {:noreply, socket}
  end

  def handle_event("update_param", %{"key" => key, "value" => value}, socket) do
    socket =
      socket
      |> assign(String.to_existing_atom(key), value)
      |> assign(:page_no, 0)
      |> load_events()

    {:noreply, socket}
  end

  def handle_event("load_more", _params, socket) do
    socket = update(socket, :page_no, &(&1 + 1))
    {:noreply, load_events(socket)}
  end

  defp load_events(socket) do
    title = socket.assigns.title
    category_id = socket.assigns.category_id
    city_id = socket.assigns.city_id
    start_date = socket.assigns.start_date
    page_no = socket.assigns.page_no
    sort_by = socket.assigns.sort_by
    sort_dir = socket.assigns.sort_dir

    case EventService.search_events(
           title,
           category_id,
           city_id,
           start_date,
           page_no,
           sort_by,
           sort_dir
         ) do
      {:ok, %{content: events, last: last}} ->
        all_events_loaded = last

        events =
          if page_no > 0 do
            Enum.uniq_by(socket.assigns.events ++ events, & &1.id)
          else
            events
          end

        assign(socket, events: events, all_events_loaded: all_events_loaded)

      {:error, _reason} ->
        assign(socket, events: [], all_events_loaded: true)
    end
  end
end
