const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Event description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  location: {
    type: String,
    required: [true, 'Event location is required'],
    trim: true
  },
  date: {
    type: Date,
    required: [true, 'Event date is required'],
    validate: {
      validator: function(value) {
        // Ensure the event date is not in the past
        return value >= new Date();
      },
      message: 'Event date cannot be in the past'
    }
  },
  maxParticipants: {
    type: Number,
    required: [true, 'Maximum participants is required'],
    min: [1, 'Must have at least 1 participant spot'],
    max: [10000, 'Cannot exceed 10000 participants']
  },
  currentParticipants: {
    type: Number,
    default: 0,
    min: [0, 'Current participants cannot be negative'],
    validate: {
      validator: function(value) {
        // Current participants should not exceed max participants
        return value <= this.maxParticipants;
      },
      message: 'Current participants cannot exceed maximum participants'
    }
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Add an index on location for faster searching
eventSchema.index({ location: 1 });

// Add a virtual property to check if event is full
eventSchema.virtual('isFull').get(function() {
  return this.currentParticipants >= this.maxParticipants;
});

// Add a virtual property to calculate available spots
eventSchema.virtual('availableSpots').get(function() {
  return this.maxParticipants - this.currentParticipants;
});

// Ensure virtuals are included when converting to JSON
eventSchema.set('toJSON', { virtuals: true });
eventSchema.set('toObject', { virtuals: true });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;