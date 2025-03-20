const Navbar = () => {
    return (
      <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-md z-50">
        <div className="container mx-auto flex justify-between items-center p-4">
          <h1 className="text-xl font-bold text-primary">Finance Assistant</h1>
          <div className="space-x-4">
            <button className="px-4 py-2 rounded-lg transition hover:bg-gray-200">Home</button>
            <button className="px-4 py-2 rounded-lg transition hover:bg-gray-200">Learn</button>
            <button className="px-4 py-2 rounded-lg transition hover:bg-gray-200">Invest</button>
          </div>
        </div>
      </nav>
    );
  };
  