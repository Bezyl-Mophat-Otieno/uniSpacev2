import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BookingForm = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const nextDay = new Date();
  nextDay.setDate(nextDay.getDate() + 1);

  const twoDaysAhead = new Date();
  twoDaysAhead.setDate(twoDaysAhead.getDate() + 2);
  const allowedBookingDates=[nextDay,twoDaysAhead]

  console.log(selectedDate)
  return (
    <div>
      <h1>Booking Form</h1>
      <DatePicker
        selected={selectedDate}
        onChange={()=>setSelectedDate(handleDateChange)}
        minDate={nextDay}
        maxDate={twoDaysAhead}
        includeDates={allowedBookingDates}
      />
    </div>
  );
};

export default BookingForm;
