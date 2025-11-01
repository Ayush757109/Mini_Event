import { useState, useEffect, useCallback } from 'react';
import { fetchEvents } from '../services/api';
import EventCard from '../components/EventCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300); 

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const loadEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchEvents(debouncedSearch);
      setEvents(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setDebouncedSearch('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Discover Events
          </h1>
          <p className="text-gray-600">
            Find and join amazing events happening near you
          </p>
        </div>

        <div className="mb-8">
          <div className="relative max-w-xl">
            <input
              type="text"
              placeholder="Search events by location..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-4 py-3 pl-12 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <span className="absolute left-4 top-3.5 text-gray-400 text-xl">
              🔍
            </span>
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
          {debouncedSearch && (
            <p className="mt-2 text-sm text-gray-600">
              Showing results for: <span className="font-semibold">{debouncedSearch}</span>
            </p>
          )}
        </div>

        {loading ? (
          <LoadingSpinner message="Loading events..." />
        ) : error ? (
          <ErrorMessage message={error} onRetry={loadEvents} />
        ) : events.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No events found
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm
                ? `No events matching "${searchTerm}". Try a different location.`
                : 'There are no events available at the moment. Be the first to create one!'}
            </p>
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="px-4 py-2 bg-primary-600 text-gray-900 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Found <span className="font-semibold">{events.length}</span>{' '}
                {events.length === 1 ? 'event' : 'events'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EventList;