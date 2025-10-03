import { dateTimeFormatter } from "../../../utils/dateTimeFormatter";

const GridItem = ({ item }) => {
  return (
    <div className="w-60 p-3 border rounded-2xl border-neutral-200 shadow-sm">
      <img src={item.image} alt={item.title} className="w-full h-60 rounded-2xl mb-3 object-cover" />

      <p className="font-bold truncate">{item.title}</p>
      <p className=" text-neutral-400">
        {dateTimeFormatter.formatDateTime(item.start_date, item.start_time)}
      </p>
      <p className=" text-neutral-400">{item.city}</p>
    </div>
  );
};

export default GridItem;
