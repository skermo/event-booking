defmodule EventBookingSSRWeb.BookEventModal do
  use EventBookingSSRWeb, :live_component

  alias EventBookingSSR.EventService
  alias EventBookingSSRWeb.Modal

  import EventBookingSSRWeb.Button
  import EventBookingSSRWeb.InputField
  import EventBookingSSRWeb.Select

  attr :id, :string, default: "book-event-modal"
  attr :event, :map, required: true
  attr :on_close, :string, required: true
  attr :on_success, :fun, required: true

  def book_event_modal(assigns) do
    ~H"""
    <.live_component module={EventBookingSSRWeb.BookEventModal} {assigns} id={@id} />
    """
  end

  def mount(socket) do
    socket =
      socket
      |> assign(:ticket_options, [
        %{value: "standard", label: "Standard"},
        %{value: "student", label: "Student (20% off)"},
        %{value: "retiree", label: "Retiree (30% off)"}
      ])
      |> assign(:form_data, %{
        full_name: "",
        phone_number: "",
        email: "",
        number_of_tickets: 1,
        ticket_type: "standard"
      })
      |> assign(:errors, %{})

    {:ok, socket}
  end

  def render(assigns) do
    ~H"""
    <div>
      <.live_component
        module={Modal}
        id="book-event-modal"
        title="Book Event!"
        description="You are about to book the event. Are you sure you want to continue?"
        on_close={@on_close}
      >
        <:body>
          <form phx-submit="submit" phx-target={@myself} class="flex flex-col gap-4">
            <.select
              label="Ticket Type"
              name="ticket_type"
              value={@form_data.ticket_type}
              options={@ticket_options}
              phx-change="change"
              phx-target={@myself}
            />

            <.input_field
              label="Full Name"
              name="full_name"
              value={@form_data.full_name}
              errors={@errors}
              phx-change="change"
              phx-target={@myself}
            />

            <.input_field
              name="phone_number"
              label="Phone Number"
              value={@form_data.phone_number}
              errors={@errors}
              phx-change="change"
              phx-target={@myself}
            />

            <.input_field
              name="email"
              label="Email"
              value={@form_data.email}
              errors={@errors}
              phx-change="change"
              phx-target={@myself}
            />

            <.input_field
              name="number_of_tickets"
              type="number"
              label="Number of Tickets"
              value={@form_data.number_of_tickets}
              errors={@errors}
              phx-change="change"
              phx-target={@myself}
            />
          </form>

          <p class="mt-5 font-semibold">Price: {calculate_price(@event, @form_data)} KM</p>
        </:body>

        <:footer>
          <.button label="Cancel" type={:secondary} phx-click={@on_close} />
          <.button label="Confirm Booking" type={:primary} phx-click="submit" phx-target={@myself} />
        </:footer>
      </.live_component>
    </div>
    """
  end

  def handle_event("change", %{"_target" => [field]} = params, socket) do
    value = Map.get(params, field)

    {:noreply, update_form_data(socket, field, value)}
  end

  def handle_event("submit", _params, socket) do
    form_data = socket.assigns.form_data
    errors = validate(form_data)

    if map_size(errors) == 0 do
      case EventService.book_event(socket.assigns.event.id, form_data.number_of_tickets) do
        {:ok, :success} ->
          socket.assigns.on_success.()
          {:noreply, socket}

        {:error, reason} ->
          {:noreply, assign(socket, errors: %{api: "Could not book tickets: #{inspect(reason)}"})}
      end
    else
      {:noreply, assign(socket, errors: errors)}
    end
  end

  defp update_form_data(socket, field, value) do
    updated_form =
      Map.update!(socket.assigns.form_data, String.to_existing_atom(field), fn _ -> value end)

    assign(socket, form_data: updated_form)
  end

  defp validate(form_data) do
    %{}
    |> maybe_add_error(:full_name, form_data.full_name, "Full name is required")
    |> maybe_add_error(:phone_number, form_data.phone_number, "Phone number is required")
    |> maybe_add_error(:email, form_data.email, "Email is required")
    |> maybe_add_email_error(form_data.email)
    |> maybe_add_ticket_error(form_data.number_of_tickets)
  end

  defp maybe_add_error(errors, key, val, msg) do
    if String.trim(val) == "", do: Map.put(errors, key, msg), else: errors
  end

  defp maybe_add_email_error(errors, email) do
    if email != "" and !String.contains?(email, "@") do
      Map.put(errors, :email, "Invalid email")
    else
      errors
    end
  end

  defp maybe_add_ticket_error(errors, count) do
    count_int = String.to_integer("#{count}")

    if count_int < 1,
      do: Map.put(errors, :number_of_tickets, "At least 1 ticket required"),
      else: errors
  end

  defp calculate_price(event, form_data) do
    base_price = event.priceInBAM * String.to_integer("#{form_data.number_of_tickets}")
    discount = base_price * get_discount(form_data.ticket_type)
    :erlang.float_to_binary(base_price - discount, decimals: 2)
  end

  defp get_discount("student"), do: 0.2
  defp get_discount("retiree"), do: 0.3
  defp get_discount(_), do: 0
end
