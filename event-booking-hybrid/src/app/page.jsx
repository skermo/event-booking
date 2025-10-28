import Carousel from "../../components/ui/Carousel/Carousel.jsx";
import EventsGrid from "./EventsGrid.jsx";
import { eventService } from "../../services/eventService.js";

export default async function HomePage() {
  const recommendedEvents = await eventService.getFeaturedEvents();
  const initialFeaturedEvents = await eventService.getFutureEvents(0);

  return (
    <div>
      <Carousel slides={recommendedEvents} />

      <div className="m-15">
        <p className="font-bold mb-3 text-xl">Future Events</p>

        <EventsGrid
          initialEvents={initialFeaturedEvents.content}
          totalPages={initialFeaturedEvents.totalPages}
        />
      </div>
    </div>
  );
}
