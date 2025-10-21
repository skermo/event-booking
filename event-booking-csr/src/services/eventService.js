const API_URL = import.meta.env.VITE_API_URL;

async function getFeaturedEvents() {
  const data = await fetch(`${API_URL}/events/featured`).then((data) => {
    return data.json();
  });
  return data;
}

async function getFutureEvents(pageNo) {
  const data = await fetch(
    `${API_URL}/events/future?pageNo=${pageNo}&pageSize=5`
  ).then((data) => {
    return data.json();
  });
  return data;
}

async function getEventById(event_id) {
  const data = await fetch(`${API_URL}/events/${event_id}`).then((data) => {
    return data.json();
  });
  return data;
}

async function getSimilarEvents(event_id) {
  const data = await fetch(`${API_URL}/events/${event_id}/similar`).then(
    (data) => {
      return data.json();
    }
  );
  return data;
}

async function searchEvents(
  title,
  categoryId,
  cityId,
  startDate,
  pageNo,
  sortBy,
  sortDir
) {
  const data = await fetch(
    `${API_URL}/events/search?pageNo=${pageNo}&pageSize=5&sortBy=${sortBy}&sortDir=${sortDir}&title=${title}&categoryId=${categoryId}&cityId=${cityId}&startDate=${startDate}`
  ).then((data) => {
    return data.json();
  });
  return data;
}

export const eventService = {
  getFutureEvents,
  getFeaturedEvents,
  getEventById,
  getSimilarEvents,
  searchEvents,
};
