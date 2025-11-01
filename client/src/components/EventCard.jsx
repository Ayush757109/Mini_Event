import { Link } from 'react-router-dom';
import { formatDate, getRelativeTime } from '../utils/dateUtils';

const EventCard = ({ event }) => {
  const availableSpots = event.maxParticipants - event.currentParticipants;
  const isFull = availableSpots <= 0;
  const isAlmostFull = availableSpots > 0 && availableSpots <= 5;

  return (
    <Link to={`/events/${event._id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full border border-gray-200 hover:border-primary-500">
        <div className="bg-adaptive-gradient from-primary-500 to-primary-600 p-4 text-gray-900">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold line-clamp-2">{event.title}</h3>
            <span className="bg-white text-primary-700 text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ml-2">
              {getRelativeTime(event.date)}
            </span>
          </div>
        </div>

        <div className="p-4">
          <p className="text-gray-600 text-sm line-clamp-3 mb-4">
            {event.description}
          </p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-700">
              <span className="mr-2">📍</span>
              <span className="font-medium">{event.location}</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <span className="mr-2">📅</span>
              <span>{formatDate(event.date)}</span>
            </div>
          </div>

          <div className="border-t pt-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-900">Participants</span>
              <span className="text-sm font-semibold text-gray-800">
                {event.currentParticipants} / {event.maxParticipants}
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  isFull
                    ? 'bg-red-500'
                    : isAlmostFull
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
                }`}
                style={{
                  width: `${(event.currentParticipants / event.maxParticipants) * 100}%`,
                }}
              />
            </div>

            <div className="mt-2 text-right">
              {isFull ? (
                <span className="text-xs font-semibold text-red-600">Event Full</span>
              ) : isAlmostFull ? (
                <span className="text-xs font-semibold text-yellow-600">
                  Only {availableSpots} spots left!
                </span>
              ) : (
                <span className="text-xs font-semibold text-green-600">
                  {availableSpots} spots available
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="px-4 pb-4">
          <button className="w-full bg-primary-600 text-gray-900 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;