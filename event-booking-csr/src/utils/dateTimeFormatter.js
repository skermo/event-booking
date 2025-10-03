function formatDateTime(date, time) {
  const [year, month, day] = date.split("-"); 
  return `${day}.${month}.${year}. at ${time.slice(0, 5)}`;
}

export const dateTimeFormatter = { formatDateTime };
