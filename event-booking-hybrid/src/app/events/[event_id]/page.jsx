import { eventService } from "../../../../services/eventService";
import EventPhotos from "./EventPhotos";
import EventMap from "./EventMap";
import EventDetailsHeader from "./EventDetailsHeader";
import GridItem from "../../../../components/ui/GridItem/GridItem";

export default async function EventDetailsPage({ params }) {
  const { event_id } = params;

  const event = await eventService.getEventById(event_id);
  const similarEvents = await eventService.getSimilarEvents(event_id);

  return (
    <div className="m-15">
      <EventDetailsHeader event={event} />

      <EventPhotos photos={event.images} />

      <div className="flex min-h-80 h-fit mt-5">
        <div className="w-1/2 flex flex-col gap-2">
          <p className="font-bold text-3xl">{event.title}</p>
          <p>{event.description}</p>
          <div className="flex">
            <p className="text-neutral-500 mr-1">Location:</p>
            <p>
              {event.city.name}, {event.address}
            </p>
          </div>
          <div className="flex">
            <p className="text-neutral-500 mr-1">Start time:</p>
            <p>
              {event.startDate} {event.startTime}
            </p>
          </div>
          <div className="flex">
            <p className="text-neutral-500 mr-1">Duration:</p>
            <p>{event.durationInMinutes} min</p>
          </div>
          <div className="flex">
            <p className="text-neutral-500 mr-1">Category:</p>
            <p className="capitalize">{event.category.name}</p>
          </div>
          <div className="flex">
            <p className="text-neutral-500 mr-1">Price:</p>
            <p>{event.priceInBAM} KM</p>
          </div>
          <div className="flex">
            <p className="text-neutral-500 mr-1">Tickets left:</p>
            <p>{event.numberOfTicketsLeft}</p>
          </div>
        </div>

        <div className="w-1/2">
          <EventMap address={`${event.city.name}, ${event.address}`} />
        </div>
      </div>

      <p className="font-bold text-xl my-5">See also</p>

      <div className="flex gap-10 justify-between">
        {similarEvents.map((similarEvent) => (
          <GridItem key={similarEvent.id} item={similarEvent} />
        ))}
      </div>
    </div>
  );
}
