import Calendar from 'react-calendar';
import React, { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import './Main.css';

const dummyDateList = [
  {
    start: '2023-08-05',
    end: '2023-08-10',
  },
  {
    start: '2023-08-02',
    end: '2023-08-10',
  },
  {
    start: '2023-08-05',
    end: '2023-08-10',
  },
];

const Main = () => {
  const [date, setDate] = useState(new Date());
  const getTileContent = ({ date }) => {
    const dateString = date.toISOString().substring(0, 10); // 'YYYY-MM-DD' 형태로 변환
    for (const { start, end } of dummyDateList) {
      if (dateString >= start && dateString <= end) {
        return <div className="date-range"></div>;
      }
    }
    return null;
  }; // 기간을 계산하여 커스텀컨텐츠 생성

  const getTileClassName = ({ date }) => {
    const dateString = date.toISOString().substring(0, 10); // 'YYYY-MM-DD' 형태로 변환
    for (const { start } of dummyDateList) {
      if (dateString === start) {
        return 'start-date';
      }
    }
    return null;
  };
  //   dummyDateList.map((it) => {
  //     if (dateString === it.start) {
  //       return <div className="start-date"></div>;
  //     }
  //   });
  // };
  // 날짜 클릭 시 해당 날짜를 상태로 저장하는 함수

  return (
    <div className="Main">
      <section className="mini_calendar">
        <div className="add_container"></div>
        <div className="calendar_container">
          <Calendar
            onChange={setDate}
            value={date}
            formatDay={(locale, date) =>
              date.toLocaleString('en', { day: 'numeric' })
            } //날짜에 숫자만 들어가게 하기
            tileClassName={getTileClassName}
          />
        </div>
      </section>
    </div>
  );
};
export default Main;
