// TODO (skermo): get real results from API
async function getRecommendedEvents() {
  return [
    {
      image: "https://m.media-amazon.com/images/I/71WJlUBG91L._AC_SL1273_.jpg",
      title: "Concert Night",
      description: "Join us for an unforgettable night of music!",
      city: "Banja Luka",
      startDate: "2025-10-05",
      startTime: "18:30:00",
    },
    {
      image:
        "https://i.pinimg.com/564x/5d/ed/f8/5dedf81378faf7cb35aa0180698cc13c.jpg",
      title: "Art Exhibition",
      description: "Discover amazing art from local artists.",
      city: "Sarajevo",
      startDate: "2025-10-06",
      startTime: "18:30:00",
    },
    {
      image:
        "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=400,height=400/event-covers/hc/b868f311-bbf5-4517-9f58-bc3ee33ae8ce",
      title: "Tech Meetup",
      description:
        "Connect with innovators in your city.blablablablablablablablablablablablavvvvvblablablablablablavvblablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla",
      city: "Tuzla",
      startDate: "2025-10-07",
      startTime: "18:30:00",
    },
  ];
}

async function getFeaturedEvents() {
  return [
    {
      image: "https://m.media-amazon.com/images/I/71WJlUBG91L._AC_SL1273_.jpg",
      title: "Concert Night",
      description: "Join us for an unforgettable night of music!",
      city: "Banja Luka",
      startDate: "2025-10-05",
      startTime: "18:30:00",
    },
    {
      image:
        "https://i.pinimg.com/564x/5d/ed/f8/5dedf81378faf7cb35aa0180698cc13c.jpg",
      title: "Art Exhibition",
      description: "Discover amazing art from local artists.",
      city: "Sarajevo",
      startDate: "2025-10-06",
      startTime: "18:30:00",
    },
    {
      image:
        "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=400,height=400/event-covers/hc/b868f311-bbf5-4517-9f58-bc3ee33ae8ce",
      title: "Tech Meetup",
      description:
        "Connect with innovators in your city.blablablablablablablablablablablablavvvvvblablablablablablavvblablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla",
      city: "Tuzla",
      startDate: "2025-10-07",
      startTime: "18:30:00",
    },
    {
      image: "https://m.media-amazon.com/images/I/71WJlUBG91L._AC_SL1273_.jpg",
      title: "Concert Night",
      description: "Join us for an unforgettable night of music!",
      city: "Banja Luka",
      startDate: "2025-10-05",
      startTime: "18:30:00",
    },
    {
      image:
        "https://i.pinimg.com/564x/5d/ed/f8/5dedf81378faf7cb35aa0180698cc13c.jpg",
      title: "Art Exhibition",
      description: "Discover amazing art from local artists.",
      city: "Sarajevo",
      startDate: "2025-10-06",
      startTime: "18:30:00",
    },
    {
      image:
        "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=400,height=400/event-covers/hc/b868f311-bbf5-4517-9f58-bc3ee33ae8ce",
      title: "Tech Meetup",
      description:
        "Connect with innovators in your city.blablablablablablablablablablablablavvvvvblablablablablablavvblablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla",
      city: "Tuzla",
      startDate: "2025-10-07",
      startTime: "18:30:00",
    },
  ];
}

async function getEventById(_event_id) {
  return {
    images: [
      {
        url: "https://m.media-amazon.com/images/I/71WJlUBG91L._AC_SL1273_.jpg",
        isPrimary: true,
      },
      {
        url: "https://www.rollingstone.com/wp-content/uploads/2019/01/beatles-live-1964.jpg?w=1581&h=1054&crop=1",
        isPrimary: false,
      },
      {
        url: "https://i.ebayimg.com/images/g/q8YAAOSwM8Jl78pO/s-l1200.jpg",
        isPrimary: false,
      },
      {
        url: "https://a.ltrbxd.com/resized/sm/upload/i1/5c/9i/nc/3IWcQMmYc1bzbHqWWBHqplPJWjL-1200-1200-675-675-crop-000000.jpg?v=b089fc8af1",
        isPrimary: false,
      },
      {
        url: "https://media.gettyimages.com/id/2642432/photo/screaming-teenage-beatles-fans-in-america.jpg?s=612x612&w=gi&k=20&c=yP6OYyisZxh6LlcyG01Y7fvO3hOfY55t_b5KykEPOOo=",
        isPrimary: false,
      },
    ],
    title: "Concert Night",
    description: "Join us for an unforgettable night of music!",
    city: "Zenica",
    startDate: "2025-10-05",
    startTime: "18:30:00",
    address: "Dr. Ćire Truhelke 2A",
    category: "music",
    durationInMinutes: 240,
    numberOfTicketsLeft: 15,
    priceInBAM: 250,
  };
}

async function getSimilarEvents(_event_id) {
  return [
    {
      image: "https://m.media-amazon.com/images/I/71WJlUBG91L._AC_SL1273_.jpg",
      title: "Concert Night",
      description: "Join us for an unforgettable night of music!",
      city: "Banja Luka",
      startDate: "2025-10-05",
      startTime: "18:30:00",
    },
    {
      image:
        "https://i.pinimg.com/564x/5d/ed/f8/5dedf81378faf7cb35aa0180698cc13c.jpg",
      title: "Art Exhibition",
      description: "Discover amazing art from local artists.",
      city: "Sarajevo",
      startDate: "2025-10-06",
      startTime: "18:30:00",
    },
    {
      image:
        "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=400,height=400/event-covers/hc/b868f311-bbf5-4517-9f58-bc3ee33ae8ce",
      title: "Tech Meetup",
      description:
        "Connect with innovators in your city.blablablablablablablablablablablablavvvvvblablablablablablavvblablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla",
      city: "Tuzla",
      startDate: "2025-10-07",
      startTime: "18:30:00",
    },
    {
      image: "https://m.media-amazon.com/images/I/71WJlUBG91L._AC_SL1273_.jpg",
      title: "Concert Night",
      description: "Join us for an unforgettable night of music!",
      city: "Banja Luka",
      startDate: "2025-10-05",
      startTime: "18:30:00",
    },
    {
      image:
        "https://i.pinimg.com/564x/5d/ed/f8/5dedf81378faf7cb35aa0180698cc13c.jpg",
      title: "Art Exhibition",
      description: "Discover amazing art from local artists.",
      city: "Sarajevo",
      startDate: "2025-10-06",
      startTime: "18:30:00",
    },
    {
      image:
        "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=400,height=400/event-covers/hc/b868f311-bbf5-4517-9f58-bc3ee33ae8ce",
      title: "Tech Meetup",
      description:
        "Connect with innovators in your city.blablablablablablablablablablablablavvvvvblablablablablablavvblablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla",
      city: "Tuzla",
      startDate: "2025-10-07",
      startTime: "18:30:00",
    },
  ];
}

export const eventService = {
  getRecommendedEvents,
  getFeaturedEvents,
  getEventById,
  getSimilarEvents,
};
