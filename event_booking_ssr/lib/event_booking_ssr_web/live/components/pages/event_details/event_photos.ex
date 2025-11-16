defmodule EventBookingSSRWeb.EventPhotos do
  use EventBookingSSRWeb, :component

  attr :photos, :list, required: true

  def event_photos(assigns) do
    assigns =
      assigns
      |> assign(:primary, Enum.find(assigns.photos, & &1.isPrimary))
      |> assign(:secondary, Enum.filter(assigns.photos, &(!&1.isPrimary)))

    ~H"""
    <div class="flex gap-4 w-full h-100 my-5">
      <%= if @primary do %>
        <img src={@primary.url} class="w-1/2 h-full object-cover rounded-2xl" />
      <% end %>

      <div class="grid grid-cols-2 grid-rows-2 gap-2 w-1/2">
        <%= for photo <- @secondary do %>
          <img
            id={"photo-#{photo.id}"}
            src={photo.url}
            class="w-full h-full object-cover rounded-2xl"
          />
        <% end %>
      </div>
    </div>
    """
  end
end
