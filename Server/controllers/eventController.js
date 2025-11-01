const Event = require('../models/Event');

// Create a new event
const createEvent = async (req, res) => {
  try {
    const { title, description, location, date, maxParticipants, currentParticipants } = req.body;

    // Validate required fields
    if (!title || !description || !location || !date || !maxParticipants) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Create new event
    const event = await Event.create({
      title,
      description,
      location,
      date,
      maxParticipants,
      currentParticipants: currentParticipants || 0
    });

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: event
    });

  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }

    console.error('Error creating event:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create event. Please try again.'
    });
  }
};

// Get all events with optional location filter
const getAllEvents = async (req, res) => {
  try {
    const { location } = req.query;
    
    // Build the query object
    let query = {};
    
    // If location filter is provided, perform case-insensitive search
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    // Fetch events, sorted by date (earliest first)
    const events = await Event.find(query).sort({ date: 1 });

    res.status(200).json({
      success: true,
      count: events.length,
      data: events
    });

  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch events. Please try again.'
    });
  }
};

// Get a single event by ID
const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid event ID format'
      });
    }

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    res.status(200).json({
      success: true,
      data: event
    });

  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch event. Please try again.'
    });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById
};