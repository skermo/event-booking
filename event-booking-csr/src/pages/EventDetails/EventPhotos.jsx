const EventPhotos = ({ photos }) => {
  const primary = photos.find((p) => p.isPrimary);
  const secondary = photos.filter((p) => !p.isPrimary);

  return (
    <div className="flex gap-4 w-full h-100 my-5">
      <img src={primary.url} className="w-1/2 h-full object-cover rounded-2xl" />

      <div className="grid grid-cols-2 grid-rows-2 gap-2 w-1/2">
        {secondary.map((photo) => (
          <img
            key={photo.id}
            src={photo.url}
            className="w-full h-1/2 object-cover rounded-2xl"
          />
        ))}
      </div>
    </div>
  );
};

export default EventPhotos;
