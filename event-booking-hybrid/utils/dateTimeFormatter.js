function formatDateTime(date, time) {
  const [year, month, day] = date.split("-");
  return `${day}.${month}.${year}. at ${time.slice(0, 5)}`;
}

function formatDuration(durationInMinutes) {
  const days = Math.floor(durationInMinutes / (24 * 60));
  const hours = Math.floor((durationInMinutes % (24 * 60)) / 60);
  const minutes = durationInMinutes % 60;

  const parts = [];
  if (days > 0) parts.push(`${days} day${days > 1 ? "s" : ""}`);
  if (hours > 0) parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  if (minutes > 0) parts.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);

  return parts.join(", ") || "0 minutes";
}

export const dateTimeFormatter = { formatDateTime, formatDuration };
