defmodule EventBookingSSRWeb.Modal do
  use EventBookingSSRWeb, :live_component

  attr :id, :string, required: true
  attr :title, :string, default: nil
  attr :description, :string, default: nil
  attr :on_close, :string, default: nil

  slot :inner_block, required: false
  slot :body, required: false
  slot :footer, required: false

  def modal(assigns) do
    ~H"""
    <.live_component module={EventBookingSSRWeb.Modal} {assigns} />
    """
  end

  def render(assigns) do
    ~H"""
    <div id={@id} class="fixed inset-0 flex items-center justify-center z-50">
      <div
        class="absolute inset-0 bg-black/50"
        phx-click={@on_close}
        phx-target={@myself}
      >
      </div>

      <div class="relative bg-white rounded-2xl shadow-lg w-full max-w-lg mx-4 p-6 z-10">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">{@title}</h2>
          <button
            type="button"
            class="text-gray-500 hover:text-gray-700 cursor-pointer"
            phx-click={@on_close}
            phx-target={@myself}
          >
            ✕
          </button>
        </div>

        <%= if @description do %>
          <p>{@description}</p>
        <% end %>

        {render_slot(@body)}
        {render_slot(@inner_block)}

        <%= if @footer != [] do %>
          <div class="py-4 flex justify-between gap-3">
            {render_slot(@footer)}
          </div>
        <% end %>
      </div>
    </div>
    """
  end
end
