import { useState } from "react";
import Modal from "../../components/ui/Modal/Modal";
import InputField from "../../components/ui/InputField/InputField";
import Button from "../../components/ui/Button/Button";
import Select from "../../components/ui/Select/Select";

const BookEventModal = ({ event, onClose, onBookingSuccess }) => {
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
    let isValid = setValidations();

    if (isValid) {
      onBookingSuccess();
    }
  };

  const setValidations = () => {
    const newErrors = {};

    if (!formData.fullName || formData.fullName.trim() === "") {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.phoneNumber || formData.phoneNumber.trim() === "") {
      newErrors.phoneNumber = "Phone number is required";
    }

    if (!formData.email || formData.email.trim() === "") {
      newErrors.email = "Email is required";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Invalid email";
    }

    if (formData.numberOfTickets < 1) {
      newErrors.numberOfTickets = "At least 1 ticket required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  return (
    <Modal
      title={"Book Event!"}
      description={
        "You are about to book the event, are you sure you want to continue?"
      }
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
            label={"Full Name"}
            name={"fullName"}
            type={"text"}
            placeholder={"Enter your name here.."}
            value={formData.fullName}
            errors={errors}
            onChange={handleChange}
          />

          <InputField
            label={"Phone Number"}
            name={"phoneNumber"}
            type={"text"}
            placeholder={"Enter your phone number here.."}
            value={formData.phoneNumber}
            errors={errors}
            onChange={handleChange}
          />

          <InputField
            label={"Email"}
            name={"email"}
            type={"text"}
            placeholder={"Enter your email here.."}
            value={formData.email}
            errors={errors}
            onChange={handleChange}
          />

          <InputField
            label={"Number of Tickets"}
            name={"numberOfTickets"}
            type={"number"}
            min="1"
            value={formData.numberOfTickets}
            errors={errors}
            onChange={handleChange}
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
};

export default BookEventModal;
