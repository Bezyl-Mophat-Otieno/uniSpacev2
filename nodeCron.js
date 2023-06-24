import cron from 'node-cron'

cron.schedule('* * * * *', async () => {
  // Get the current date and time
  const currentDate = new Date();

  try {
    // Find the venues whose valid until date has passed
    const expiredVenues = await Venue.find({ validUntil: { $lt: currentDate } });

    // Release the venues by updating their status
    await Venue.updateMany({ _id: { $in: expiredVenues.map(venue => venue._id) } }, { bookedStatus: false });

    // Update the clubs' booked venues status
    await Club.updateMany(
      { bookedVenues: { $in: expiredVenues.map(venue => venue._id) } },
      { $set: { 'bookedVenues.$[].status': 'released' } }
    );

    console.log('Venues released and statuses updated successfully.');
     // ...
// Inside the cron job after updating the venues' status
// Get all connected clients and emit an update message
const clients = io.sockets.sockets;
const updatedVenues = await Venue.find({}); // Fetch all venues or use a specific query
for (const clientId in clients) {
  clients[clientId].emit('venues', updatedVenues);
}


  } catch (error) {
    console.error('An error occurred:', error);
  }
}
);
