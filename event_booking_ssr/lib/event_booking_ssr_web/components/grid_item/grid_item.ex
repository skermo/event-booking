defmodule EventBookingSSRWeb.GridItem do
  use EventBookingSSRWeb, :component

  alias EventBookingSSRWeb.DateTimeFormatter

  attr(:item, :map, required: true)
  attr(:rest, :global, include: ~w(class))

  def grid_item(assigns) do
    ~H"""
    <div class={"w-60 p-3 border rounded-2xl border-neutral-200 shadow-sm cursor-pointer #{@rest["class"]}"}>
      <a
        href={~p"/events/#{@item.id}"}
        phx-no-format
        class="block"
      >
        <img
          src={primary_image_url(@item)}
          alt={@item.title}
          class="w-full h-60 rounded-2xl mb-3 object-cover"
        />

        <p class="font-bold truncate"><%= @item.title %></p>
        <p class="text-neutral-400">
          <%= DateTimeFormatter.format_date_time(@item.startDate, @item.startTime) %>
        </p>
        <p class="text-neutral-400"><%= @item.city.name %></p>
      </a>
    </div>
    """
  end

  defp primary_image_url(item) do
    case Enum.find(item.images, & &1.isPrimary) do
      %{url: url} -> url
      _ -> "/images/placeholder.png"
    end
  end
end
