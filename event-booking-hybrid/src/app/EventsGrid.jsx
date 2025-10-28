"use client";

import { useState } from "react";
import GridItem from "../../components/ui/GridItem/GridItem";
import Button from "../../components/ui/Button/Button.jsx";
import { eventService } from "../../services/eventService.js";

export default function EventsGrid({ initialEvents, totalPages }) {
  const [featuredEvents, setFeaturedEvents] = useState(initialEvents);
  const [pageNo, setPageNo] = useState(1); // page 0 already loaded
  const [allEventsLoaded, setAllEventsLoaded] = useState(false);

  const loadMore = async () => {
    const res = await eventService.getFutureEvents(pageNo);
    setFeaturedEvents((prev) => [
      ...prev,
      ...res.content.filter((e) => !prev.some((p) => p.id === e.id)),
    ]);
    setAllEventsLoaded(res.last);
    setPageNo(pageNo + 1);
  };

  return (
    <>
      <div className="flex flex-wrap gap-10 justify-between pb-10">
        {featuredEvents.map((event) => (
          <GridItem key={event.id} item={event} />
        ))}
      </div>

      {!allEventsLoaded && (
        <div className="flex justify-center mt-5" style={{marginTop: "20px"}}>
          <Button label="Load More" type="primary" onClick={loadMore} />
        </div>
      )}
    </>
  );
}
