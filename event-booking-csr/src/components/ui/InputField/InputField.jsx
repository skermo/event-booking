const InputField = ({
  label,
  value,
  type,
  name,
  onChange,
  placeholder,
  errors,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium  mb-1">{label}</label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
        {...props}
      />
      {errors && errors[name] && (
        <p className="text-red-500 text-sm">{errors[name]}</p>
      )}
    </div>
  );
};

export default InputField;
