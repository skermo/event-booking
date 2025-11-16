defmodule EventBookingSSRWeb.Carousel do
  use EventBookingSSRWeb, :live_component

  attr(:id, :string, default: "carousel-component")
  attr(:slides, :list)
  attr(:auto_play_interval, :integer, default: 6000)

  def carousel(assigns) do
    ~H"""
    <.live_component module={EventBookingSSRWeb.Carousel} {assigns} />
    """
  end

  def mount(socket) do
    {:ok, socket}
  end

  def update(%{play_next_slide: true}, socket) do
    next_index = rem(socket.assigns.current_index + 1, socket.assigns.slide_count)

    Phoenix.LiveView.send_update_after(
      __MODULE__,
      [id: socket.assigns.id, play_next_slide: true],
      socket.assigns.auto_play_interval
    )

    socket = socket |> assign(:current_index, next_index)

    {:ok, socket}
  end

  def update(assigns, socket) do
    socket =
      socket
      |> assign(assigns)
      |> assign(:slide_count, length(assigns.slides))
      |> assign(:current_index, 0)

    if socket.assigns.slide_count > 0 do
      Phoenix.LiveView.send_update_after(
        __MODULE__,
        [id: socket.assigns.id, play_next_slide: true],
        socket.assigns.auto_play_interval
      )
    end

    {:ok, socket}
  end

  def handle_event("go_to_slide", %{"index" => index_str}, socket) do
    socket = socket |> assign(current_index: String.to_integer(index_str))

    {:noreply, socket}
  end

  def handle_event("next_slide", _params, socket) do
    %{current_index: current, slide_count: count} = socket.assigns
    next_index = rem(current + 1, count)

    socket = socket |> assign(:current_index, next_index)

    {:noreply, assign(socket, current_index: next_index)}
  end

  def handle_event("prev_slide", _params, socket) do
    %{current_index: current, slide_count: count} = socket.assigns
    prev_index = rem(current - 1 + count, count)

    socket = socket |> assign(:current_index, prev_index)

    {:noreply, socket}
  end
end
