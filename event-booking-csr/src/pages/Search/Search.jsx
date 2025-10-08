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

  let name = searchParams.get("name");
  let category = searchParams.get("category");
  let city = searchParams.get("city");
  let startDate = searchParams.get("startDate");
  let endDate = searchParams.get("endDate");
  let sortBy = searchParams.get("sortBy");
  let sortDir = searchParams.get("sortDir");

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
      .searchEvents(name, category, city, startDate, endDate, sortBy, sortDir)
      .then((res) => {
        setEvents(res);
      });
  }, [name, category, city, sortBy, sortDir]);

  const sortByOptions = [
    {
      value: "startDate",
      label: "Start date",
    },
    {
      value: "endDate",
      label: "End date",
    },
  ];

  const sortDirOptions = [
    { value: "asc", label: "Ascending" },
    { value: "desc", label: "Descending" },
  ];

  return (
    <div className="p-6">
      <div className="flex gap-3 mb-5 w-full items-end">
        <InputField
          label="Search"
          name={"name"}
          type="text"
          placeholder={"Search events.."}
          value={name}
          onChange={() => setSearchParams(searchParams)}
        />
        <Button
          label={"Search"}
          type="primary"
          onClick={() => setSearchParams(searchParams)}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <Select
          label="City"
          name="city"
          value={city}
          onChange={(e) => updateParam("city", e.target.value)}
          options={cities}
        />
        <Select
          label="Category"
          name="category"
          value={category}
          onChange={(e) => updateParam("category", e.target.value)}
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

        <InputField
          label="End Date"
          name={"endDate"}
          type="date"
          placeholder={"Select an end date"}
          value={endDate}
          onChange={(e) => updateParam("endDate", e.target.value)}
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
    </div>
  );
};

export default Search;
