function Button({ 
  children, 
  onClick, 
  type = "button", 
  variant = "primary", 
  className = "" 
}) {
  const base = "px-4 py-2 rounded font-semibold transition-colors";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    success: "bg-green-600 text-white hover:bg-green-700",
    neutral: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
