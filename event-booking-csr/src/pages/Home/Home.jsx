import { useEffect, useState } from "react";
import Carousel from "../../components/ui/Carousel/Carousel";
import { eventService } from "../../services/eventService.js";
import GridItem from "../../components/ui/GridItem/GridItem.jsx";

const Home = () => {
  const [recommendedEvents, setRecommendedEvents] = useState([]);
  const [featuredEvents, setFeaturedEvents] = useState([]);

  useEffect(() => {
    eventService
      .getRecommendedEvents()
      .then((res) => setRecommendedEvents(res));

    eventService.getRecommendedEvents().then((res) => setFeaturedEvents(res));
  }, []);

  return (
    <div>
      <Carousel slides={recommendedEvents} />
      <div className="m-15">
        <p className="font-bold mb-3 text-xl">Featured Events</p>
        <div className="flex flex-wrap gap-10 justify-between">
          {featuredEvents.map((event, _index) => (
            <GridItem item={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
