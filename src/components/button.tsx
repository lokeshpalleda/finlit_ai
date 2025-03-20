const Button = ({ children, ...props }) => {
    return (
      <button
        {...props}
        className="px-6 py-3 bg-blue-500 text-white rounded-xl transition-all duration-300 hover:bg-blue-600 shadow-md hover:shadow-lg"
      >
        {children}
      </button>
    );
  };
  