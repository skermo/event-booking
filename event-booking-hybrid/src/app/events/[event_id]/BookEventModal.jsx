"use client";

import { useState } from "react";
import Button from "../../../../components/ui/Button/Button";
import InputField from "../../../../components/ui/InputField/InputField";
import Modal from "../../../../components/ui/Modal/Modal";
import Select from "../../../../components/ui/Select/Select";
import { eventService } from "../../../../services/eventService";

export default function BookEventModal({ event, onClose, onBookingSuccess }) {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    numberOfTickets: 1,
    ticketType: "standard",
  });
  const [errors, setErrors] = useState({});

  const ticketOptions = [
    { value: "standard", label: "Standard" },
    { value: "student", label: "Student (20% off)" },
    { value: "retiree", label: "Retiree (30% off)" },
  ];

  const getDiscount = () => {
    switch (formData.ticketType) {
      case "student":
        return 0.2;
      case "retiree":
        return 0.3;
      default:
        return 0;
    }
  };

  const calculatePrice = () => {
    const basePrice = event.priceInBAM * formData.numberOfTickets;
    const discount = basePrice * getDiscount();
    return (basePrice - discount).toFixed(2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    eventService
      .bookEvent(event.id, formData.numberOfTickets)
      .then(() => {
        onBookingSuccess();
      })
      .catch((err) => {
        console.error("Booking failed", err);
      });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full name required";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone number required";
    if (!formData.email || !formData.email.includes("@"))
      newErrors.email = "Valid email required";
    if (formData.numberOfTickets < 1)
      newErrors.numberOfTickets = "At least 1 ticket required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <Modal
      title="Book Event!"
      description="You are about to book the event. Are you sure you want to continue?"
      onClose={onClose}
    >
      <Modal.Body>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Select
            label="Ticket Type"
            name="ticketType"
            value={formData.ticketType}
            onChange={handleChange}
            options={ticketOptions}
          />
          <InputField
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            errors={errors}
          />
          <InputField
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            errors={errors}
          />
          <InputField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            errors={errors}
          />
          <InputField
            label="Number of Tickets"
            name="numberOfTickets"
            type="number"
            min={1}
            value={formData.numberOfTickets}
            onChange={handleChange}
            errors={errors}
          />
        </form>
        <p className="mt-5 font-semibold">Price: {calculatePrice()} KM</p>
      </Modal.Body>
      <Modal.Footer>
        <Button label="Cancel" type="secondary" onClick={onClose} />
        <Button label="Confirm Booking" type="primary" onClick={handleSubmit} />
      </Modal.Footer>
    </Modal>
  );
}
