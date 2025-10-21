import { useEffect, useState } from "react";
import { eventService } from "../../services/eventService";
import { useParams } from "react-router-dom";
import EventPhotos from "./EventPhotos";
import { dateTimeFormatter } from "../../utils/dateTimeFormatter";
import EventMap from "./EventMap";
import GridItem from "../../components/ui/GridItem/GridItem";
import Button from "../../components/ui/Button/Button";
import BookEventModal from "./BookEventModal";
import FlashMessage from "../../components/ui/FlashMessage/FlashMessage";

const EventDetails = () => {
  const { event_id } = useParams();

  const [event, setEvent] = useState(null);
  const [similarEvents, setSimilarEvents] = useState([]);
  const [bookEventModalOpened, setBookEventModalOpened] = useState(false);
  const [eventBooked, setEventBooked] = useState(false);

  const loadEvent = () => {
    eventService.getEventById(event_id).then((res) => {
      setEvent(res);
    });
  };

  const handleBookingSuccess = () => {
    setEventBooked(true);
    loadEvent();
    setBookEventModalOpened(false);
  };

  useEffect(() => {
    loadEvent();

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
      {bookEventModalOpened && (
        <BookEventModal
          event={event}
          onClose={() => {
            setBookEventModalOpened(false);
          }}
          onBookingSuccess={handleBookingSuccess}
        />
      )}

      {eventBooked && (
        <FlashMessage label="Booking successful!" type="success" />
      )}

      <div className="flex justify-between">
        <p className="font-bold text-xl">Event Details</p>
        <Button
          label={"Book Event"}
          type="primary"
          onClick={() => {
            setBookEventModalOpened(true);
          }}
        />
      </div>

      <EventPhotos photos={event.images} />

      <div className="flex min-h-80 h-fit">
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
            <p className="capitalize">{event.category.name}</p>
          </div>
          <div className="flex">
            <p className="text-neutral-500 mr-1">Price:</p>
            <p className="capitalize">{event.priceInBAM} KM</p>
          </div>
          <div className="flex">
            <p className="text-neutral-500 mr-1">Number of tickets left:</p>
            <p className="capitalize">{event.numberOfTicketsLeft}</p>
          </div>
        </div>
        <div className="w-1/2">
          <EventMap address={`${event.city.name}, ${event.address}`} />
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
