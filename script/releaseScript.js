const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const axios = require('axios');
const cron = require('node-cron');
const Booking = require('./models/booking.js');
const StudentOrganization = require('./models/studentOrganization.js');
const Venue = require('./models/venue.js');
const { Server } = require('socket.io');
const dbConnect = require('./utils/mongodb.js');

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});


cron.schedule('* * * * *', async () => {
  const currentDate = new Date();

  try {
    await dbConnect();

    // Find the expired bookings
    const expiredBookings = await Booking.find({ validUntil: { $lt: currentDate } });

    // Create maps to track the latest bookings for each Student Organization and Venue
    const latestBookingsByOrganizationMap = new Map();
    const latestBookingsByVenueMap = new Map();

    // Iterate through the expired bookings
    for (const booking of expiredBookings) {
      const orgName = booking.orgName;
      const venueName = booking.venueName;

      // Update the latest booking for the Student Organization
      if (!latestBookingsByOrganizationMap.has(orgName) || booking.bookingDate > latestBookingsByOrganizationMap.get(orgName).bookingDate) {
        latestBookingsByOrganizationMap.set(orgName, booking);
      }

      // Update the latest booking for the Venue
      if (!latestBookingsByVenueMap.has(venueName) || booking.bookingDate > latestBookingsByVenueMap.get(venueName).bookingDate) {
        latestBookingsByVenueMap.set(venueName, booking);
      }
    }

    // Get the latest bookings for each Student Organization
    const latestBookingsByOrganization = Array.from(latestBookingsByOrganizationMap.values());

    // Extract the organization names from the latest bookings
    const expiredOrganizationNames = latestBookingsByOrganization.map(booking => booking.orgName);

    // Update the venueAssignment attribute for each organization
    await StudentOrganization.updateMany(
      { name: { $in: expiredOrganizationNames } },
      { $set: { venueAssignment: false } },
      { new: true, runValidators: true }
    );

    // Get the latest bookings for each Venue
    const latestBookingsByVenue = Array.from(latestBookingsByVenueMap.values());

    // Extract the venue names from the latest bookings
    const expiredVenueNames = latestBookingsByVenue.map(booking => booking.venueName);

    // Update the venues with the extracted names
    await Venue.updateMany(
      { name: { $in: expiredVenueNames } },
      { $set: { bookedStatus: false, bookedBy: "" } }
    );

    console.log('Venues and organizations updated successfully.');
  } catch (error) {
    console.error(error);
  }
});
