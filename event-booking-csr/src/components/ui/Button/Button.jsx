const Button = ({ label, type, disabled = false, onClick }) => {
  const typeClasses = {
    primary: "bg-primary text-white",
    secondary: "bg-secondary text-white",
  };

  return (
    <button
      className={`cursor-pointer font-semibold px-10 py-2 rounded-2xl text-lg shadow-sm ${
        typeClasses[type] || typeClasses.primary
      } ${disabled ? "opacity-50 cursor-none" : ""}`}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
