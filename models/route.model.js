const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  origin: {
    type: { type: String },
    coordinates: [Number],
    required: 'Origin is required'
  },
  destination: {
    type: { type: String },
    coordinates: [Number],
    required: 'Destination is required'
  },
  dateWanted: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const Route = mongoose.model('Route', routeSchema);
module.exports = Route;