"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import InputField from "../../../components/ui/InputField/InputField";
import Button from "../../../components/ui/Button/Button";
import Select from "../../../components/ui/Select/Select";
import GridItem from "../../../components/ui/GridItem/GridItem";
import { eventService } from "../../../services/eventService";

export default function EventsSearchGrid({
  initialEvents,
  initialTotalPages,
  initialCategories,
  initialCities,
  initialSearchParams,
}) {
  const router = useRouter();
  const searchParamsHook = useSearchParams();

  const [events, setEvents] = useState(initialEvents);
  const [categories] = useState(initialCategories);
  const [cities] = useState(initialCities);
  const [pageNo, setPageNo] = useState(0);
  const [allEventsLoaded, setAllEventsLoaded] = useState(
    initialTotalPages <= 1
  );
  const [searchParams, setSearchParams] = useState(initialSearchParams);

  useEffect(() => {
    eventService
      .searchEvents(
        searchParams.title,
        searchParams.categoryId,
        searchParams.cityId,
        searchParams.startDate,
        pageNo,
        searchParams.sortBy,
        searchParams.sortDir
      )
      .then((res) => {
        setAllEventsLoaded(res.last);
        setPageNo(0);
        setEvents(res.content);
      });
  }, [searchParams]);

  const updateParam = (key, value) => {
    const newParams = new URLSearchParams(searchParamsHook.toString());
    if (value) newParams.set(key, value);
    else newParams.delete(key);

    setSearchParams((prev) => ({ ...prev, [key]: value }));

    router.replace(`/search?${newParams.toString()}`);
  };

  const loadMore = async () => {
    const res = await eventService.searchEvents(
      searchParams.title,
      searchParams.categoryId,
      searchParams.cityId,
      searchParams.startDate,
      pageNo + 1,
      searchParams.sortBy,
      searchParams.sortDir
    );

    setEvents((prev) => [
      ...prev,
      ...res.content.filter((e) => !prev.some((p) => p.id === e.id)),
    ]);
    setAllEventsLoaded(res.last);
    setPageNo((prev) => prev + 1);
  };

  const handleSearch = async () => {
    const res = await eventService.searchEvents(
      searchParams.title,
      searchParams.categoryId,
      searchParams.cityId,
      searchParams.startDate,
      0,
      searchParams.sortBy,
      searchParams.sortDir
    );

    setEvents(res.content);
    setPageNo(0);
    setAllEventsLoaded(res.last);
  };

  return (
    <>
      <div className="flex gap-3 mb-5 w-full items-end">
        <InputField
          label="Search"
          name="title"
          type="text"
          placeholder="Search events.."
          value={searchParams.title}
          onChange={(e) => updateParam("title", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <Select
          label="City"
          name="city"
          value={searchParams.cityId}
          onChange={(e) => updateParam("cityId", e.target.value)}
          options={cities}
        />
        <Select
          label="Category"
          name="category"
          value={searchParams.categoryId}
          onChange={(e) => updateParam("categoryId", e.target.value)}
          options={categories}
        />
        <InputField
          label="Start Date"
          name="startDate"
          type="date"
          placeholder="Select a start date"
          value={searchParams.startDate}
          onChange={(e) => updateParam("startDate", e.target.value)}
        />
        <Select
          label="Sort By"
          name="sortBy"
          value={searchParams.sortBy}
          onChange={(e) => updateParam("sortBy", e.target.value)}
          options={[
            { value: "startDate", label: "Start date" },
            { value: "title", label: "Title" },
          ]}
        />
        <Select
          label="Sort Direction"
          name="sortDir"
          value={searchParams.sortDir}
          onChange={(e) => updateParam("sortDir", e.target.value)}
          options={[
            { value: "asc", label: "Ascending" },
            { value: "desc", label: "Descending" },
          ]}
        />
      </div>

      <div>
        {events.length === 0 ? (
          <p className="text-neutral-500 italic">No events found.</p>
        ) : (
          <div className="flex flex-wrap gap-10 justify-between">
            {events.map((event) => (
              <GridItem key={event.id} item={event} />
            ))}
          </div>
        )}
      </div>

      {!allEventsLoaded && (
        <div className="flex justify-center mt-5">
          <Button label="Load More" type="primary" onClick={loadMore} />
        </div>
      )}
    </>
  );
}
