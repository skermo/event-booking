import { useEffect, useState } from "react";
import { eventService } from "../../services/eventService";
import { useParams } from "react-router-dom";
import EventPhotos from "./EventPhotos";
import { dateTimeFormatter } from "../../utils/dateTimeFormatter";
import EventMap from "./EventMap";
import GridItem from "../../components/ui/GridItem/GridItem";

const EventDetails = () => {
  const { event_id } = useParams();

  const [event, setEvent] = useState(null);
  const [similarEvents, setSimilarEvents] = useState([]);

  useEffect(() => {
    eventService.getEventById(event_id).then((res) => {
      setEvent(res);
    });

    eventService.getSimilarEvents(event_id).then((res) => {
      setSimilarEvents(res);
    });
  }, [event_id]);

  if (!event) {
    return (
      <div className="text-center text-xl mt-50 italic text-secondary">
        Loading...
      </div>
    );
  }

  return (
    <div className="m-15">
      <p className="font-bold text-xl">Event Details</p>

      <EventPhotos photos={event.images} />

      <div className="flex min-h-80 h-fit">
        <div className="w-1/2 flex flex-col gap-2">
          <p className="font-bold text-3xl">{event.title}</p>
          <p>{event.description}</p>
          <div className="flex">
            <p className="text-neutral-500 mr-1">Location:</p>
            <p>
              {event.city}, {event.address}
            </p>
          </div>
          <div className="flex">
            <p className="text-neutral-500 mr-1">Start time:</p>
            <p>
              {dateTimeFormatter.formatDateTime(
                event.startDate,
                event.startTime
              )}
            </p>
          </div>
          <div className="flex">
            <p className="text-neutral-500 mr-1">Duration:</p>
            <p> {dateTimeFormatter.formatDuration(event.durationInMinutes)}</p>
          </div>
          <div className="flex">
            <p className="text-neutral-500 mr-1">Category:</p>
            <p className="capitalize">{event.category}</p>
          </div>
        </div>
        <div className="w-1/2">
          <EventMap address={`${event.city}, ${event.address}`} />
        </div>
      </div>

      <p className="font-bold text-xl my-5">See also</p>
      <div className="flex gap-10 justify-between">
        {similarEvents.map((event, _index) => (
          <GridItem item={event} />
        ))}
      </div>
    </div>
  );
};

export default EventDetails;
