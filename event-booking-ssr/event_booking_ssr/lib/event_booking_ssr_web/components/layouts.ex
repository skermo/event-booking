defmodule EventBookingSSRWeb.Layouts do
  @moduledoc """
  This module holds layouts and related functionality
  used by your application.
  """
  use EventBookingSSRWeb, :html

  # Embed all files in layouts/* within this module.
  # The default root.html.heex file contains the HTML
  # skeleton of your application, namely HTML headers
  # and other static content.
  embed_templates "layouts/*"

  @doc """
  Renders your app layout.

  This function is typically invoked from every template,
  and it often contains your application menu, sidebar,
  or similar.

  ## Examples

      <Layouts.app flash={@flash}>
        <h1>Content</h1>
      </Layouts.app>

  """
  attr :flash, :map, required: true, doc: "the map of flash messages"

  attr :current_scope, :map,
    default: nil,
    doc: "the current [scope](https://hexdocs.pm/phoenix/scopes.html)"

  slot :inner_block, required: true

  def app(assigns) do
    ~H"""
    <div class="flex flex-col min-h-screen">
      <.header />

      <main class="flex-1">
        {render_slot(@inner_block)}
      </main>
      <.flash_group flash={@flash} />
      <.footer />
    </div>
    """
  end

  @doc """
  Shows the flash group with standard titles and content.

  ## Examples

      <.flash_group flash={@flash} />
  """
  attr :flash, :map, required: true, doc: "the map of flash messages"
  attr :id, :string, default: "flash-group", doc: "the optional id of flash container"

  def flash_group(assigns) do
    ~H"""
    <div id={@id} aria-live="polite">
      <.flash kind={:info} flash={@flash} />
      <.flash kind={:error} flash={@flash} />

      <.flash
        id="client-error"
        kind={:error}
        title={gettext("We can't find the internet")}
        phx-disconnected={show(".phx-client-error #client-error") |> JS.remove_attribute("hidden")}
        phx-connected={hide("#client-error") |> JS.set_attribute({"hidden", ""})}
        hidden
      >
        {gettext("Attempting to reconnect")}
        <.icon name="hero-arrow-path" class="ml-1 size-3 motion-safe:animate-spin" />
      </.flash>

      <.flash
        id="server-error"
        kind={:error}
        title={gettext("Something went wrong!")}
        phx-disconnected={show(".phx-server-error #server-error") |> JS.remove_attribute("hidden")}
        phx-connected={hide("#server-error") |> JS.set_attribute({"hidden", ""})}
        hidden
      >
        {gettext("Attempting to reconnect")}
        <.icon name="hero-arrow-path" class="ml-1 size-3 motion-safe:animate-spin" />
      </.flash>
    </div>
    """
  end

  defp header(assigns) do
    ~H"""
    <header class="bg-secondary">
      <div class="flex justify-between items-center">
        <div class="flex h-20 items-center px-4">
          <a href={~p"/"} class="flex items-center">
            <img
              src={~p"/assets/icons/logo-with-name-v1.svg"}
              class="w-50 px-3 cursor-pointer"
              alt="Logo"
            />
          </a>
        </div>

        <a href={~p"/search"} class="text-white font-bold font-xl px-3">
          <img
            src={~p"/assets/icons/search-icon.svg"}
            alt="Search Icon"
            class="w-15 px-3 cursor-pointer"
          />
        </a>
      </div>
    </header>
    """
  end

  defp footer(assigns) do
    ~H"""
    <footer class="bg-linear-to-r from-amber-900 to-primary flex items-center justify-center text-white py-8">
      <div class="flex flex-col items-center gap-4 text-center">
        <a href="#">
          <img
            src={~p"/assets/icons/logo-with-name-v2.svg"}
            class="w-50 px-3"
            alt="Logo"
          />
        </a>

        <div class="flex gap-4">
          <a href={~p"/about-us"} class="uppercase">
            About us
          </a>
          <p>|</p>
          <a href={~p"/search"} class="uppercase">
            Tickets
          </a>
        </div>
        <p>
          Copyright @Bookit. Built with love in Bosnia and Herzegovina. All
          rights reserved.
        </p>
      </div>
    </footer>
    """
  end
end
