import './MyCalendarDate.css';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import React, { useState } from 'react';

const MyCalendarDate = ({ onSelectDate }) => {
  const [date, setDate] = useState(new Date());
  const handleDateChange = (date) => {
    const formattedDate = formatDate(date);
    onSelectDate(formattedDate);
  };
  const formatDate = (date) => {
    const year = date.getFullYear().toString().slice(2); // 연도의 뒤 2자리
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월을 두 자리로
    const day = date.getDate().toString().padStart(2, '0'); // 일을 두 자리로
    return `${year}.${month}.${day}`;
  };
  return (
    <div className="myCalendar_container">
      <Calendar
        onChange={handleDateChange}
        formatDay={(locale, date) =>
          date.toLocaleString('en', { day: 'numeric' })
        }
        value={date}
      />
    </div>
  );
};
export default MyCalendarDate;
