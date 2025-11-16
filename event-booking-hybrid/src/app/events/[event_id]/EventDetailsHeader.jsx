"use client";

import { useState } from "react";
import Button from "../../../../components/ui/Button/Button";
import BookEventModal from "./BookEventModal";
import FlashMessage from "../../../../components/ui/FlashMessage/FlashMessage";

export default function EventDetailsHeader({ event, onReload }) {
  const [bookEventModalOpened, setBookEventModalOpened] = useState(false);
  const [eventBooked, setEventBooked] = useState(false);

  const handleBookingSuccess = () => {
    setEventBooked(true);
    setBookEventModalOpened(false);
    if (onReload) onReload();
  };

  return (
    <div>
      {bookEventModalOpened && (
        <BookEventModal
          event={event}
          onClose={() => setBookEventModalOpened(false)}
          onBookingSuccess={handleBookingSuccess}
        />
      )}

      {eventBooked && (
        <FlashMessage label="Booking successful!" type="success" />
      )}

      <div className="flex justify-between">
        <p className="font-bold text-xl">Event Details</p>

        <Button
          label="Book Event"
          type="primary"
          onClick={() => setBookEventModalOpened(true)}
        />
      </div>
    </div>
  );
}
