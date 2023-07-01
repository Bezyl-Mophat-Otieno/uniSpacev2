const mongoose = require('mongoose');

// Using default save 
const BookingSchema = new mongoose.Schema({
  venueName: {
    type: String,
    required: true,
  },
  orgName: {
    type: String,
    required: true,
  },
  bookingDate: {
    type: Date,
    required: true,
  },
  validUntil: {
    type: Date,
    required: true,
    default: function () {
      const bookingDate = this.bookingDate || new Date();
      // Bookings availbale for only 12 hours
      return new Date(bookingDate.getTime() + 1 * 24 * 60 * 60 * 1000);
    },
  },
});

module.exports = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);



// Using pre save
// const BookingSchema = new mongoose.Schema({
//   venue: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Venue',
//     required: true,
//   },
//   club: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Club',
//     required: true,
//   },
//   bookingDate: {
//     type: Date,
//     required: true,
//     validate: {
//       validator: function (value) {
//         const today = new Date();
//         const twoDaysAhead = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000);
//         return value >= today && value <= twoDaysAhead;
//       },
//       message: 'Booking date must be within the allowed two-day window.',
//     },
//   },
//   validUntil: {
//     type: Date,
//     required: true,
//   },
//   status: {
//     type: Boolean,
//     default: false,
//   },
// });

// BookingSchema.pre('save', function (next) {
//   this.validUntil = new Date(this.bookingDate.getTime() + 2 * 24 * 60 * 60 * 1000);
//   next();
// });

// const Booking = mongoose.model('Booking', BookingSchema);

// module.exports = Booking;

