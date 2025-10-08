const Select = ({ label, name, value, onChange, options }) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium mb-1">{label}</label>
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm appearance-none"
      >
        {options.map((option, _index) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;
