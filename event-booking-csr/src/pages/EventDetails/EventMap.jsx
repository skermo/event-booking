const EventMap = ({ address }) => {
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    address
  )}&output=embed`;

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden">
      <iframe
        src={mapUrl}
        className="w-full h-full"
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default EventMap;
