import Image from "next/image";

export default function EventPhotos({ photos }) {
  const primary = photos.find((p) => p.isPrimary);
  const secondary = photos.filter((p) => !p.isPrimary);

  return (
    <div className="flex gap-4 w-full h-100 my-5">
      <Image
        src={primary.url}
        alt="Primary"
        width={796}
        height={400}
        style={{ width: "796px", height: "400px" }}
        className="w-1/2 h-full object-cover rounded-2xl"
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
          gap: "0.5rem",
          width: "50%",
        }}
      >
        {secondary.map((photo) => (
          <Image
            key={photo.id}
            src={photo.url}
            alt="Secondary"
            width={394}
            height={200}
            style={{ width: "394px", height: "200px" }}
            className="w-full h-1/2 object-cover rounded-2xl"
          />
        ))}
      </div>
    </div>
  );
}
