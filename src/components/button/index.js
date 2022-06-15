const Button = ({ text = "Button", onClick, children, type = "button" }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      type={type}
      onClick={onClick}
    >
      {children || text}
    </button>
  );
};

export default Button;
