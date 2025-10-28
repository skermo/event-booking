import './../globals.css'
import EventsSearchGrid from "./EventSearchGrid";

import { categoryService } from "../../../services/categoryService";
import { cityService } from "../../../services/cityService";
import { eventService } from "../../../services/eventService";


export default async function SearchPage({ searchParams: sp }) {
  const searchParams = await sp;

  const title = searchParams?.title || "";
  const categoryId = searchParams?.categoryId || "";
  const cityId = searchParams?.cityId || "";
  const startDate = searchParams?.startDate || "";
  const sortBy = searchParams?.sortBy || "";
  const sortDir = searchParams?.sortDir || "";

  const [categoriesRes, citiesRes, eventsRes] = await Promise.all([
    categoryService.getAllCategories(),
    cityService.getAllCities(),
    eventService.searchEvents(
      title,
      categoryId,
      cityId,
      startDate,
      0,
      sortBy,
      sortDir
    ),
  ]);

  const formattedCategories = [
    { value: "", label: "Select a category" },
    ...categoriesRes.map((c) => ({ value: c.id, label: c.name })),
  ];

  const formattedCities = [
    { value: "", label: "Select a city" },
    ...citiesRes.map((c) => ({ value: c.id, label: c.name })),
  ];

  return (
    <div className="px-15 py-6">
      <EventsSearchGrid
        initialEvents={eventsRes.content}
        initialTotalPages={eventsRes.totalPages}
        initialCategories={formattedCategories}
        initialCities={formattedCities}
        initialSearchParams={{ title, categoryId, cityId, startDate, sortBy, sortDir }}
      />
    </div>
  );
}
