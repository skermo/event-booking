defmodule EventBookingSSRWeb.InputField do
  use Phoenix.Component

  attr :label, :string, default: nil
  attr :value, :string, default: ""
  attr :type, :string, default: "text"
  attr :name, :string, required: true
  attr :placeholder, :string, default: nil
  attr :errors, :map, default: %{}
  attr :rest, :global, doc: "phx-change, phx-blur, phx-target, etc."

  def input_field(assigns) do
    ~H"""
    <div class="w-full">
      <%= if @label do %>
        <label class="block text-sm font-medium mb-1">{@label}</label>
      <% end %>

      <input
        type={@type}
        name={@name}
        placeholder={@placeholder}
        value={@value}
        required
        class="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
        {@rest}
      />

      <%= if @errors[@name |> String.to_atom()] do %>
        <p class="text-red-500 text-sm">{@errors[@name |> String.to_atom()]}</p>
      <% end %>
    </div>
    """
  end
end
