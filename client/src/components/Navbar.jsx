import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-blue-300 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
                <Link to="/" className="flex items-center space-x-2">
                <span className="text-xl font-bold text-gray-800">
                  Event<span className="text-primary-600">Finder</span>
                </span>
                </Link>

          <div className="flex space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive('/')
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All Events
            </Link>
            <Link
              to="/create"
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive('/create')
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Create Event
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;