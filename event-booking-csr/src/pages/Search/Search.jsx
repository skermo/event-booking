import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { categoryService } from "../../services/categoryService";
import { cityService } from "../../services/cityService";
import { eventService } from "../../services/eventService";
import InputField from "../../components/ui/InputField/InputField.jsx";
import Button from "../../components/ui/Button/Button.jsx";
import Select from "../../components/ui/Select/Select.jsx";
import GridItem from "../../components/ui/GridItem/GridItem.jsx";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [events, setEvents] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [allEventsLoaded, setAllEventsLoaded] = useState(false);

  let title = searchParams.get("title") || "";
  let categoryId = searchParams.get("categoryId") || "";
  let cityId = searchParams.get("cityId") || "";
  let startDate = searchParams.get("startDate") || "";
  let sortBy = searchParams.get("sortBy") || "";
  let sortDir = searchParams.get("sortDir") || "";

  useEffect(() => {
    categoryService.getAllCategories().then((res) => {
      const formattedCategories = [
        { value: "", label: "Select a category" },
        ...res.map((category) => ({
          value: category.id,
          label: category.name,
        })),
      ];
      setCategories(formattedCategories);
    });

    cityService.getAllCities().then((res) => {
      const formattedCities = [
        { value: "", label: "Select a city" },
        ...res.map((city) => ({
          value: city.id,
          label: city.name,
        })),
      ];
      setCities(formattedCities);
    });
  }, []);

  useEffect(() => {
    eventService
      .searchEvents(
        title,
        categoryId,
        cityId,
        startDate,
        pageNo,
        sortBy,
        sortDir
      )
      .then((res) => {
        setAllEventsLoaded(res.last);
        setPageNo(0);
        setEvents(res.content);
      });
  }, [title, categoryId, cityId, startDate, sortBy, sortDir]);

  useEffect(() => {
    eventService
      .searchEvents(
        title,
        categoryId,
        cityId,
        startDate,
        pageNo,
        sortBy,
        sortDir
      )
      .then((res) => {
        setAllEventsLoaded(res.last);

        setEvents((prev) => {
          const newEvents = res.content.filter(
            (e) => !prev.some((p) => p.id === e.id)
          );
          return [...prev, ...newEvents];
        });
      });
  }, [pageNo]);

  const sortByOptions = [
    {
      value: "startDate",
      label: "Start date",
    },
    {
      value: "title",
      label: "Title",
    },
  ];

  const sortDirOptions = [
    { value: "asc", label: "Ascending" },
    { value: "desc", label: "Descending" },
  ];

  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    setSearchParams(params);
  };

  return (
    <div className="px-15 py-6">
      <div className="flex gap-3 mb-5 w-full items-end">
        <InputField
          label="Search"
          name={"title"}
          type="text"
          placeholder={"Search events.."}
          value={title}
          onChange={(e) => updateParam("title", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <Select
          label="City"
          name="city"
          value={cityId}
          onChange={(e) => updateParam("cityId", e.target.value)}
          options={cities}
        />
        <Select
          label="Category"
          name="category"
          value={categoryId}
          onChange={(e) => updateParam("categoryId", e.target.value)}
          options={categories}
        />

        <InputField
          label="Start Date"
          name={"startDate"}
          type="date"
          placeholder={"Select a start date"}
          value={startDate}
          onChange={(e) => updateParam("startDate", e.target.value)}
        />

        <Select
          label="Sort By"
          name="sortBy"
          value={sortBy}
          onChange={(e) => updateParam("sortBy", e.target.value)}
          options={sortByOptions}
        />

        <Select
          label="Sort Direction"
          name="sortDir"
          value={sortDir}
          onChange={(e) => updateParam("sortDir", e.target.value)}
          options={sortDirOptions}
        />
      </div>

      <div>
        {events.length === 0 ? (
          <p className="text-neutral-500 italic">No events found.</p>
        ) : (
          <div className="flex flex-wrap gap-10 justify-between">
            {events.map((event, _index) => (
              <GridItem item={event} />
            ))}
          </div>
        )}
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
  );
};

export default Search;
