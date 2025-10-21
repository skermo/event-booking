import { useEffect, useState } from "react";
import Carousel from "../../components/ui/Carousel/Carousel";
import { eventService } from "../../services/eventService.js";
import GridItem from "../../components/ui/GridItem/GridItem.jsx";
import Button from "../../components/ui/Button/Button.jsx";

const Home = () => {
  const [recommendedEvents, setRecommendedEvents] = useState([]);
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [allEventsLoaded, setAllEventsLoaded] = useState(false);

  useEffect(() => {
    eventService.getFeaturedEvents().then((res) => setRecommendedEvents(res));
  }, []);

  useEffect(() => {
    eventService.getFutureEvents(pageNo).then((res) => {
      setAllEventsLoaded(res.last);
      setFeaturedEvents((prev) => {
        const newEvents = res.content.filter(
          (e) => !prev.some((p) => p.id === e.id)
        );
        return [...prev, ...newEvents];
      });
    });
  }, [pageNo]);

  return (
    <div>
      <Carousel slides={recommendedEvents} />
      <div className="m-15">
        <p className="font-bold mb-3 text-xl">Future Events</p>
        <div className="flex flex-wrap gap-10 justify-between">
          {featuredEvents.map((event, _index) => (
            <GridItem item={event} key={event.id} />
          ))}
        </div>
        {allEventsLoaded == false && (
          <div className="flex justify-center mt-5">
            <Button
              label="Load More"
              type="primary"
              onClick={() => setPageNo(pageNo + 1)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
