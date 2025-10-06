const Modal = ({ onClose, title, description, children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-lg w-full max-w-lg mx-4 p-6 z-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            X
          </button>
        </div>
        <p>{description}</p>

        <div>{children}</div>
      </div>
    </div>
  );
};

Modal.Body = ({ children }) => <div className="py-4">{children}</div>;

Modal.Footer = ({ children }) => (
  <div className="py-4 flex justify-between gap-3">{children}</div>
);

export default Modal;
