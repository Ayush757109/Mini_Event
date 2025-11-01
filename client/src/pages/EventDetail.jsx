import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchEventById } from '../services/api';
import { formatDate, getRelativeTime, isEventPast } from '../utils/dateUtils';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadEventDetails();
  }, [id]);

  const loadEventDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchEventById(id);
      setEvent(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <LoadingSpinner message="Loading event details..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <ErrorMessage 
            message={error.includes('not found') ? 'Event not found. It may have been deleted.' : error}
            onRetry={error.includes('not found') ? null : loadEventDetails}
          />
          <div className="text-center mt-4">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-primary-600 text-gray-500 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Back to Events
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!event) return null;

  const availableSpots = event.maxParticipants - event.currentParticipants;
  const isFull = availableSpots <= 0;
  const isPast = isEventPast(event.date);
  const participationPercentage = (event.currentParticipants / event.maxParticipants) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <span className="mr-2">←</span>
          Back to Events
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to from-primary-500 to-primary-600 p-8 text-black">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {event.title}
                </h1>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-white text-primary-700 text-sm font-semibold px-3 py-1 rounded-full">
                    {getRelativeTime(event.date)}
                  </span>
                  {isPast && (
                    <span className="bg-gray-800 text-white text-sm font-semibold px-3 py-1 rounded-full">
                      Past Event
                    </span>
                  )}
                  {isFull && !isPast && (
                    <span className="bg-red-500 text-black text-sm font-semibold px-3 py-1 rounded-full">
                      Event Full
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-3">About This Event</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start">
                  <span className="text-2xl mr-3">📅</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Date & Time</h3>
                    <p className="text-gray-600">{formatDate(event.date)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start">
                  <span className="text-2xl mr-3">📍</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                    <p className="text-gray-600">{event.location}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Participants</h2>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-3xl font-bold text-gray-900">
                      {event.currentParticipants}
                      <span className="text-lg text-gray-600 font-normal">
                        {' '}/ {event.maxParticipants}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {isFull ? (
                        <span className="text-red-600 font-semibold">No spots available</span>
                      ) : (
                        <span>
                          <span className="text-green-600 font-semibold">{availableSpots}</span>
                          {' '}spots remaining
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-primary-600">
                      {participationPercentage.toFixed(0)}%
                    </p>
                    <p className="text-sm text-gray-600">Capacity</p>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      isFull
                        ? 'bg-red-500'
                        : participationPercentage > 80
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                    }`}
                    style={{ width: `${participationPercentage}%` }}
                  />
                </div>
              </div>

              {!isPast && (
                <div className="mt-6">
                  <button
                    disabled={isFull}
                    className={`w-full py-4 rounded-lg font-semibold text-lg transition-colors ${
                      isFull
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-primary-600 text-grren hover:bg-primary-700'
                    }`}
                  >
                    {isFull ? 'Event is Full' : 'Join This Event'}
                  </button>
                  <p className="text-center text-xs text-gray-500 mt-2">
                    * Joining functionality coming soon
                  </p>
                </div>
              )}
            </div>

            <div className="border-t mt-6 pt-6">
              <p className="text-xs text-gray-500">
                Event created on {new Date(event.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;