import Calendar from 'react-calendar';
import React, { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
const Main = () => {
  const [value, setValue] = useState(new Date());
  return (
    <div className="Main">
      <Calendar onChange={setValue} value={value} />
    </div>
  );
};
export default Main;
