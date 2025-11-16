defmodule EventBookingSSRWeb.Button do
  use Phoenix.Component

  attr :label, :string, default: nil
  attr :type, :atom, default: :primary, values: [:primary, :secondary]
  attr :disabled, :boolean, default: false
  attr :class, :string, default: nil
  attr :rest, :global, include: ~w(phx-click phx-value- phx-disable phx-target)

  @type_classes %{
    primary: "bg-primary text-white",
    secondary: "bg-secondary text-white"
  }

  def button(assigns) do
    type_classes = Map.get(@type_classes, assigns.type, Map.get(@type_classes, :primary))

    base_classes = "cursor-pointer font-semibold px-6 py-2 rounded-lg text-lg shadow-sm h-fit"

    final_classes =
      [base_classes, type_classes, assigns.class]
      |> Enum.reject(&is_nil/1)
      |> Enum.join(" ")

    ~H"""
    <button
      class={
        if @disabled,
          do: "#{final_classes} opacity-50 cursor-not-allowed",
          else: final_classes
      }
      disabled={@disabled}
      {@rest}
    >
      {@label}
    </button>
    """
  end
end
