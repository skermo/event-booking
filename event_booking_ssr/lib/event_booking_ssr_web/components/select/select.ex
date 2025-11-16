defmodule EventBookingSSRWeb.Select do
  use Phoenix.Component

  attr :label, :string, default: nil
  attr :name, :string, required: true
  attr :value, :string, required: true
  attr :options, :list, required: true
  attr :rest, :global, doc: "Accepts phx-change, phx-input, phx-target, class, etc."

  def select(assigns) do
    ~H"""
    <div>
      <%= if @label do %>
        <label class="block text-sm font-medium mb-1">{@label}</label>
      <% end %>

      <select
        name={@name}
        value={@value}
        class="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm appearance-none"
        {@rest}
      >
        <%= for option <- @options do %>
          <option value={option.value}>{option.label}</option>
        <% end %>
      </select>
    </div>
    """
  end
end
