// TODO (skermo): get real results from API
async function getRecommendedEvents() {
  return [
    {
      image: "https://m.media-amazon.com/images/I/71WJlUBG91L._AC_SL1273_.jpg",
      title: "Concert Night",
      description: "Join us for an unforgettable night of music!",
      city: "Banja Luka",
      start_date: "2025-10-05",
      start_time: "18:30:00",
    },
    {
      image:
        "https://i.pinimg.com/564x/5d/ed/f8/5dedf81378faf7cb35aa0180698cc13c.jpg",
      title: "Art Exhibition",
      description: "Discover amazing art from local artists.",
      city: "Sarajevo",
      start_date: "2025-10-06",
      start_time: "18:30:00",
    },
    {
      image:
        "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=400,height=400/event-covers/hc/b868f311-bbf5-4517-9f58-bc3ee33ae8ce",
      title: "Tech Meetup",
      description:
        "Connect with innovators in your city.blablablablablablablablablablablablavvvvvblablablablablablavvblablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla",
      city: "Tuzla",
      start_date: "2025-10-07",
      start_time: "18:30:00",
    },
  ];
}

// TODO (skermo): get real results from API
async function getFeaturedEvents() {
  return [
    {
      image: "https://m.media-amazon.com/images/I/71WJlUBG91L._AC_SL1273_.jpg",
      title: "Concert Night",
      description: "Join us for an unforgettable night of music!",
      city: "Banja Luka",
      start_date: "2025-10-05",
      start_time: "18:30:00",
    },
    {
      image:
        "https://i.pinimg.com/564x/5d/ed/f8/5dedf81378faf7cb35aa0180698cc13c.jpg",
      title: "Art Exhibition",
      description: "Discover amazing art from local artists.",
      city: "Sarajevo",
      start_date: "2025-10-06",
      start_time: "18:30:00",
    },
    {
      image:
        "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=400,height=400/event-covers/hc/b868f311-bbf5-4517-9f58-bc3ee33ae8ce",
      title: "Tech Meetup",
      description:
        "Connect with innovators in your city.blablablablablablablablablablablablavvvvvblablablablablablavvblablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla",
      city: "Tuzla",
      start_date: "2025-10-07",
      start_time: "18:30:00",
    },
    {
      image: "https://m.media-amazon.com/images/I/71WJlUBG91L._AC_SL1273_.jpg",
      title: "Concert Night",
      description: "Join us for an unforgettable night of music!",
      city: "Banja Luka",
      start_date: "2025-10-05",
      start_time: "18:30:00",
    },
    {
      image:
        "https://i.pinimg.com/564x/5d/ed/f8/5dedf81378faf7cb35aa0180698cc13c.jpg",
      title: "Art Exhibition",
      description: "Discover amazing art from local artists.",
      city: "Sarajevo",
      start_date: "2025-10-06",
      start_time: "18:30:00",
    },
    {
      image:
        "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=400,height=400/event-covers/hc/b868f311-bbf5-4517-9f58-bc3ee33ae8ce",
      title: "Tech Meetup",
      description:
        "Connect with innovators in your city.blablablablablablablablablablablablavvvvvblablablablablablavvblablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla",
      city: "Tuzla",
      start_date: "2025-10-07",
      start_time: "18:30:00",
    },
  ];
}

export const eventService = { getRecommendedEvents, getFeaturedEvents };
