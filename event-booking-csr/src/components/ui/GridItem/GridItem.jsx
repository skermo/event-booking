import { useNavigate } from "react-router-dom";
import { dateTimeFormatter } from "../../../utils/dateTimeFormatter";

const GridItem = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div
      className="w-60 p-3 border rounded-2xl border-neutral-200 shadow-sm cursor-pointer"
      onClick={() => navigate(`/events/${item.id}`)}
    >
      <img
        src={item.images.find((i) => i.isPrimary).url}
        alt={item.title}
        className="w-full h-60 rounded-2xl mb-3 object-cover"
      />

      <p className="font-bold truncate">{item.title}</p>
      <p className=" text-neutral-400">
        {dateTimeFormatter.formatDateTime(item.startDate, item.startTime)}
      </p>
      <p className=" text-neutral-400">{item.city.name}</p>
    </div>
  );
};

export default GridItem;
