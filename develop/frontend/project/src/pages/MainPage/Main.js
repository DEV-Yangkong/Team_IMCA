import Calendar from 'react-calendar';
import React, { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import './Main.css';
import { Data } from '../../api';
import dayjs from 'dayjs';
import Ranking from '../../components/MainPage/Ranking';

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
  const [data, setData] = useState([]);

  const getTileContent = ({ date }) => {
    const dateString = dayjs(date).format('YYYY-MM-DD'); // 'YYYY-MM-DD' 형태로 변환
    for (const { start, end } of dummyDateList) {
      if (dateString >= start && dateString <= end) {
        return <div className="date-range"></div>;
      }
    }
    return null;
  }; // 기간을 계산하여 커스텀컨텐츠 생성

  // const mark = ['2023-08-12', '2023-08-20', '2023-08-25'];

  // const tileClassName = ({ date, view }) => {
  //   if (view === 'month') {
  //     const dateString = date.toISOString().substring(0, 10);

  //     let tileClass = '';

  //     if (firstEventDates.includes(dateString)) {
  //       tileClass += 'react-calendar__tile--hasFirstEvent';
  //     }

  //     if (secondEventDates.includes(dateString)) {
  //       tileClass += ' react-calendar__tile--hasSecondEvent';
  //     }

  //     return tileClass;
  //   }
  // };
  //   dummyDateList.map((it) => {
  //     if (dateString === it.start) {
  //       return <div className="start-date"></div>;
  //     }
  //   });
  // };
  // 날짜 클릭 시 해당 날짜를 상태로 저장하는 함수

  const mark = ['2023-08-12', '2023-08-20', '2023-08-25'];
  const mark2 = ['2023-08-12', '2023-08-15'];

  const hasMark = (date, markArray) => {
    return markArray.find((x) => x === dayjs(date).format('YYYY-MM-DD'));
  };

  const tileContent = ({ date, view }) => {
    const dateStr = dayjs(date).format('YYYY-MM-DD');
    const hasMark1 = hasMark(dateStr, mark);
    const hasMark2 = hasMark(dateStr, mark2);

    return (
      <>
        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}
        >
          {hasMark1 && <div className="dot" />}
          {hasMark2 && <div className="triangle" />}
        </div>
      </>
    );
  };

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
            tileContent={tileContent}
          />
        </div>
      </section>
      <section className="ranking">
        <Ranking title="연극" />
        <Ranking title="뮤지컬" />
      </section>
    </div>
  );
};
export default Main;
