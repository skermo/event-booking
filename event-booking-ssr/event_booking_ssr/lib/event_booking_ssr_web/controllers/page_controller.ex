defmodule EventBookingSSRWeb.PageController do
  use EventBookingSSRWeb, :controller

  def home(conn, _params) do
    render(conn, :home)
  end

  def about_us(conn, _params) do
    render(conn, :about_us)
  end
end
