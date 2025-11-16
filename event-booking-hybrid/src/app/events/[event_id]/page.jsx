import { eventService } from "../../../../services/eventService";
import EventDetailsClient from "./EventDetailsClient";

export default async function EventDetailsPage({ params }) {
  const { event_id } = params;

  const event = await eventService.getEventById(event_id);
  const similarEvents = await eventService.getSimilarEvents(event_id);

  return (
    <EventDetailsClient
      initialEvent={event}
      initialSimilarEvents={similarEvents}
      eventId={event_id}
    />
  );
}
