"use client";

import Image from "next/image";

import { useRouter } from "next/navigation";
import { dateTimeFormatter } from "../../../utils/dateTimeFormatter";

const GridItem = ({ item }) => {
  const router = useRouter();

  return (
    <div
      className="p-3 border rounded-2xl border-neutral-200 shadow-sm cursor-pointer"
      onClick={() => router.push(`/events/${item.id}`)}
    >
      <Image
        src={item.images.find((i) => i.isPrimary).url}
        alt={item.title}
        width={214}
        height={240}
        style={{ width: "214px", height: "240px" }}
        className="rounded-2xl mb-3 object-cover"
      />

      <p className="font-bold truncate">{item.title}</p>
      <p className="text-neutral-400">
        {dateTimeFormatter.formatDateTime(item.startDate, item.startTime)}
      </p>
      <p className="text-neutral-400">{item.city.name}</p>
    </div>
  );
};

export default GridItem;
