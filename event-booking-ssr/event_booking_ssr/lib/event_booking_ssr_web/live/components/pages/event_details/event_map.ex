defmodule EventBookingSSRWeb.EventMap do
  use EventBookingSSRWeb, :component

  attr :address, :string, required: true

  def event_map(assigns) do
    ~H"""
    <div class="w-full h-full rounded-2xl overflow-hidden">
      <iframe
        src={"https://www.google.com/maps?q=#{URI.encode(@address)}&output=embed"}
        class="w-full h-full"
        allowfullscreen
        loading="lazy"
      >
      </iframe>
    </div>
    """
  end
end
