import './MyCalendarDate.css';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import React from 'react';

const MyCalendarDate = () => {
  return (
    <div className="myCalendar_container">
      <Calendar />
    </div>
  );
};
export default MyCalendarDate;
