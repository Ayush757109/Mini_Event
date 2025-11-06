const API_BASE_URL ='https:mini-eventbackend1.onrender.com/api';


const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  
  return data;
};

export const fetchEvents = async (location = '') => {
  try {
    const url = location 
      ? `${API_BASE_URL}/events?location=${encodeURIComponent(location)}`
      : `${API_BASE_URL}/events`;
    
    const response = await fetch(url);
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const fetchEventById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/events/${id}`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching event:', error);
    throw error;
  }
};

export const createEvent = async (eventData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};
