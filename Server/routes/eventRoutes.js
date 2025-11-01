const express = require('express');
const router = express.Router();
const {
  createEvent,
  getAllEvents,
  getEventById
} = require('../controllers/eventController');

// Route to create a new event
// POST /api/events
router.post('/', createEvent);

// Route to get all events (with optional location filter via query params)
// GET /api/events?location=Mumbai
router.get('/', getAllEvents);

// Route to get a specific event by ID
// GET /api/events/:id
router.get('/:id', getEventById);

module.exports = router;